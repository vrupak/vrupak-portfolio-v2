// @ts-nocheck
"use client";

import { heroContent } from "@/data/content";
import { useCurrentTime } from "@/hooks/useCurrentTime";
import { typography, colors, spacing } from "@/styles/design-tokens";
import Container from "./ui/Container";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

export default function Hero() {
  const currentTime = useCurrentTime();
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

    vec2 rotate(vec2 uv, float th) {
        return mat2(cos(th), sin(th), -sin(th), cos(th)) * uv;
    }

    float neuro_shape(vec2 uv, float t, float p) {
        vec2 sine_acc = vec2(0.);
        vec2 res = vec2(0.);
        float scale = 8.;

        for (int j = 0; j < 15; j++) {
            uv = rotate(uv, 1.);
            sine_acc = rotate(sine_acc, 1.);
            vec2 layer = uv * scale + float(j) + sine_acc - t;
            sine_acc += sin(layer) + 2.4 * p;
            res += (.5 + .5 * cos(layer)) / scale;
            scale *= (1.2);
        }
        return res.x + res.y;
    }

    void main() {
        vec2 uv = .5 * vUv;
        uv.x *= u_ratio;

        vec2 pointer = vUv - u_pointer_position;
        pointer.x *= u_ratio;
        float p = clamp(length(pointer), 0., 1.);
        p = .5 * pow(1. - p, 2.);

        float t = .001 * u_time;
        vec3 color = vec3(0.);

        float noise = neuro_shape(uv, t, p);

        noise = 1.2 * pow(noise, 3.);
        noise += pow(noise, 10.);
        noise = max(.0, noise - .5);
        noise *= (1. - length(vUv - .5));

        // Cyan/blue/black color palette matching accent color (#00E5FF)
        vec3 cyan = vec3(0.0, 0.898, 1.0); // Base cyan color
        vec3 blue = vec3(0.0, 0.4, 0.8); // Blue tone
        vec3 darkBlue = vec3(0.0, 0.1, 0.3); // Dark blue-black

        // Mix colors based on noise intensity and position
        color = mix(darkBlue, cyan, noise * 1.5);
        color += blue * sin(3.0 * u_scroll_progress + 1.5) * 0.3;

        // Add some pure black in lower intensity areas
        color = mix(vec3(0.0), color, smoothstep(0.0, 0.3, noise));

        color = color * noise;

        gl_FragColor = vec4(color, noise);
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
    <section className="min-h-screen flex items-center justify-center py-24 md:py-32 relative overflow-hidden bg-black">
      {/* Neural Glow Background */}
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-60"
        style={{ mixBlendMode: 'normal' }}
      />

      <Container>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center text-center relative z-10 w-full max-w-6xl mx-auto"
        >
          {/* Time Display */}
          <motion.div variants={itemVariants} className="mb-12 md:mb-16">
            <p className={`${typography.display.lg} ${colors.accent.primary} drop-shadow-[0_0_30px_rgba(var(--accent-rgb),0.5)]`}>
              {currentTime}
            </p>
          </motion.div>

          {/* Main Headlines */}
          <div className="flex flex-col space-y-6 md:space-y-8 mb-16 md:mb-20">
            <motion.h1
              variants={itemVariants}
              className={`${typography.display.md} ${colors.text.primary}`}
            >
              I DO{" "}
              <span className={`${colors.accent.primary} drop-shadow-[0_0_20px_rgba(var(--accent-rgb),0.3)]`}>THINGS.</span>
            </motion.h1>
            <motion.h2
              variants={itemVariants}
              className={`${typography.display.md} ${colors.text.primary}`}
            >
              NEED THINGS{" "}
              <span className={`${colors.accent.primary} drop-shadow-[0_0_20px_rgba(var(--accent-rgb),0.3)]`}>DONE?</span>
            </motion.h2>
          </div>

          {/* Supporting Content */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col space-y-4 max-w-3xl"
          >
            <p className={`${typography.body.xl} ${colors.text.primary}`}>
              {heroContent.services}
            </p>
            <p className={`${typography.body.lg} ${colors.text.secondary}`}>
              {heroContent.bio}
            </p>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
