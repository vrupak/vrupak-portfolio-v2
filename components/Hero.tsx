// @ts-nocheck
"use client";

import { heroContent } from "@/data/content";
import { typography, colors, spacing } from "@/styles/design-tokens";
import Container from "./ui/Container";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

export default function Hero() {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const glRef = useRef(null);
  const uniformsRef = useRef(null);
  const pointerRef = useRef({
    x: 0,
    y: 0,
    tX: 0,
    tY: 0,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const vertexShaderSource = `
    precision mediump float;

    varying vec2 vUv;
    attribute vec2 a_position;

    void main() {
        vUv = .5 * (a_position + 1.);
        gl_Position = vec4(a_position, 0.0, 1.0);
    }
  `;

  const fragmentShaderSource = `
    precision mediump float;

    varying vec2 vUv;
    uniform float u_time;
    uniform float u_ratio;
    uniform vec2 u_pointer_position;
    uniform float u_scroll_progress;

    void main() {
        // Slow down time significantly (convert ms to seconds and scale)
        float iTime = u_time * 0.0002;

        // Initial scale factor
        float scale = 0.2;
        float a;

        // Centered coordinates (from -1 to 1)
        vec2 p = (vUv * 2.0 - 1.0);

        // Adjust for aspect ratio and scale
        p.x *= u_ratio;
        p /= 0.7;

        // Diagonal vector for skewing (original singularity)
        vec2 d = vec2(-1.0, 1.0);

        // Blackhole center
        vec2 b = p - scale * d;

        // Rotate and apply perspective
        vec2 c = p * mat2(1.0, 1.0, d / (0.1 + scale / dot(b, b)));

        // Rotate into spiraling coordinates
        float logLen = 0.5 * log(dot(c, c));
        vec2 v = c * mat2(
            cos(logLen + iTime * scale),
            sin(logLen + iTime * scale),
            -sin(logLen + iTime * scale),
            cos(logLen + iTime * scale)
        ) / scale;

        // Waves cumulative total for coloring
        vec2 w = vec2(0.0);

        // Loop through waves
        for(float i = 1.0; i < 9.0; i += 1.0) {
            // Distort coordinates
            v += 0.7 * sin(v.yx * i + iTime) / i + 0.5;
            w += 1.0 + sin(v);
        }

        // Acretion disk radius
        float diskRadius = length(sin(v / 0.3) * 0.4 + c * vec2(3.0 + d.x, 3.0 + d.y));

        // Attenuation (distance-squared)
        a = dot(c, c);

        // Calculate base intensity
        vec4 O = 1.0 - exp(-exp(c.x * vec4(0.6, -0.4, -1.0, 0.0))
                   / w.xyyx
                   / (2.0 + diskRadius * diskRadius / 4.0 - diskRadius)
                   / (0.5 + 1.0 / a)
                   / (0.03 + abs(length(p) - 0.7))
             );

        // Apply color palette: Deep Teal to Vivid Magenta gradient
        vec3 deepTeal = vec3(0.008, 0.314, 0.404);      // #025067
        vec3 electricCyan = vec3(0.043, 0.624, 0.741);  // #0B9FBD
        vec3 vividMagenta = vec3(0.702, 0.106, 0.435);  // #B31B6F

        // Create horizontal gradient from teal (left) to magenta (right)
        float horizontalGradient = (p.x / u_ratio + 1.0) * 0.5;

        // Mix teal and cyan for left side, cyan and magenta for right side
        vec3 baseColor = mix(
            mix(deepTeal, electricCyan, 0.6),
            vividMagenta,
            horizontalGradient
        );

        // Apply intensity variations
        vec3 color = baseColor * (O.rgb + 0.5);

        // Brighten the overall effect
        color = color * 2.5;

        // Make it visible across the screen with subtle vignette
        float vignetteX = abs(vUv.x - 0.5) * 2.0;
        float vignetteY = abs(vUv.y - 0.5) * 2.0;
        float vignette = 1.0 - smoothstep(0.3, 1.2, max(vignetteX, vignetteY));

        // Keep more brightness overall
        color = mix(vec3(0.0), color, smoothstep(0.0, 0.4, O.a));

        // Apply subtle vignette
        color = color * (0.4 + vignette * 1.2);

        gl_FragColor = vec4(color, O.a * 2.0);
    }
  `;

  const createShader = (gl: any, sourceCode: any, type: any) => {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, sourceCode);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error("An error occurred compiling the shaders: " + gl.getShaderInfoLog(shader));
      gl.deleteShader(shader);
      return null;
    }

    return shader;
  };

  const createShaderProgram = (gl: any, vertexShader: any, fragmentShader: any) => {
    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Unable to initialize the shader program: " + gl.getProgramInfoLog(program));
      return null;
    }

    return program;
  };

  const getUniforms = (gl: any, program: any) => {
    let uniforms = [];
    let uniformCount = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
    for (let i = 0; i < uniformCount; i++) {
      let uniformName = gl.getActiveUniform(program, i).name;
      uniforms[uniformName] = gl.getUniformLocation(program, uniformName);
    }
    return uniforms;
  };

  const initShader = () => {
    const canvas = canvasRef.current;
    const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");

    if (!gl) {
      console.warn("WebGL is not supported by your browser.");
      return null;
    }

    const vertexShader = createShader(gl, vertexShaderSource, gl.VERTEX_SHADER);
    const fragmentShader = createShader(gl, fragmentShaderSource, gl.FRAGMENT_SHADER);

    const shaderProgram = createShaderProgram(gl, vertexShader, fragmentShader);
    uniformsRef.current = getUniforms(gl, shaderProgram);

    const vertices = new Float32Array([-1., -1., 1., -1., -1., 1., 1., 1.]);

    const vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    gl.useProgram(shaderProgram);

    const positionLocation = gl.getAttribLocation(shaderProgram, "a_position");
    gl.enableVertexAttribArray(positionLocation);

    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    return gl;
  };

  const resizeCanvas = () => {
    const canvas = canvasRef.current;
    const gl = glRef.current;
    if (!canvas || !gl) return;

    const devicePixelRatio = Math.min(window.devicePixelRatio, 2);
    canvas.width = window.innerWidth * devicePixelRatio;
    canvas.height = window.innerHeight * devicePixelRatio;

    gl.uniform1f(uniformsRef.current.u_ratio, canvas.width / canvas.height);
    gl.viewport(0, 0, canvas.width, canvas.height);
  };

  const render = () => {
    const gl = glRef.current;
    const uniforms = uniformsRef.current;
    const pointer = pointerRef.current;

    if (!gl || !uniforms) return;

    const currentTime = performance.now();

    pointer.x += (pointer.tX - pointer.x) * 0.2;
    pointer.y += (pointer.tY - pointer.y) * 0.2;

    gl.uniform1f(uniforms.u_time, currentTime);
    gl.uniform2f(uniforms.u_pointer_position, pointer.x / window.innerWidth, 1 - pointer.y / window.innerHeight);
    gl.uniform1f(uniforms.u_scroll_progress, window.pageYOffset / (2 * window.innerHeight));

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    animationRef.current = requestAnimationFrame(render);
  };

  const updateMousePosition = (x, y) => {
    pointerRef.current.tX = x;
    pointerRef.current.tY = y;
  };

  const handlePointerMove = (e) => {
    updateMousePosition(e.clientX, e.clientY);
  };

  const handleTouchMove = (e) => {
    updateMousePosition(e.touches[0].clientX, e.touches[0].clientY);
  };

  const handleClick = (e) => {
    updateMousePosition(e.clientX, e.clientY);
  };

  useEffect(() => {
    glRef.current = initShader();
    if (glRef.current) {
      resizeCanvas();
      render();
    }

    const handleResize = () => {
      resizeCanvas();
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("click", handleClick);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <section className="h-screen flex items-stretch relative overflow-hidden bg-black">
      {/* Singularity Effect Background */}
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
        style={{ mixBlendMode: 'normal' }}
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full h-full flex flex-col justify-between px-8 md:px-16 lg:px-24 py-16 md:py-20"
      >
        {/* Top Section */}
        <div className="flex justify-between items-start w-full">
          {/* Top Left - Name */}
          <motion.div variants={itemVariants}>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl md:text-4xl lg:text-5xl text-[#025067] leading-none">//</span>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-white leading-none whitespace-nowrap tracking-tight uppercase">
                VIDYA <span className="text-[#B31B6F] drop-shadow-[0_0_30px_rgba(179,27,111,0.6)]">RUPAK</span>
              </h1>
            </div>
          </motion.div>

          {/* Top Right */}
          <motion.div variants={itemVariants} className="text-right hidden lg:block">
            <p className="text-sm lg:text-base text-white/90 whitespace-nowrap">
              {heroContent.services}
            </p>
          </motion.div>
        </div>

        {/* Center - Singularity Effect Space */}
        <div className="flex-1" />

        {/* Bottom Section */}
        <div className="flex justify-between items-end w-full">
          {/* Bottom Left */}
          <motion.div variants={itemVariants} className="hidden lg:block">
            <p className="text-sm lg:text-base text-white/80 whitespace-nowrap">
              {heroContent.bio}
            </p>
          </motion.div>

          {/* Bottom Right - Tagline */}
          <motion.div variants={itemVariants} className="text-right ml-auto">
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white leading-none whitespace-nowrap tracking-tight uppercase">
              I DO <span className="text-[#0B9FBD] drop-shadow-[0_0_30px_rgba(11,159,189,0.6)]">THINGS.</span>
            </h2>
          </motion.div>
        </div>

        {/* Mobile/Tablet - Supporting text */}
        <motion.div variants={itemVariants} className="lg:hidden mt-8 space-y-3">
          <p className={`${typography.body.base} text-white/90`}>
            {heroContent.services}
          </p>
          <p className={`${typography.body.sm} text-white/80`}>
            {heroContent.bio}
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
