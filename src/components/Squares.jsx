import { useRef, useEffect } from "react";

export default function Squares({
  squareSize = 40,
  speed = 0.25,
  borderColor = "rgba(255,255,255,0.15)",
  hoverFillColor = "rgba(255,255,255,0.25)",
}) {
  const canvasRef = useRef(null);
  const mouse = useRef({ x: -9999, y: -9999 });
  const offset = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      offset.current.x += speed;
      offset.current.y += speed;

      const startX = -squareSize + (offset.current.x % squareSize);
      const startY = -squareSize + (offset.current.y % squareSize);

      for (let x = startX; x < canvas.width + squareSize; x += squareSize) {
        for (let y = startY; y < canvas.height + squareSize; y += squareSize) {
          const dx = mouse.current.x - x;
          const dy = mouse.current.y - y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          let alpha = 0.15;
          if (dist < 120) alpha = 0.35;

          ctx.strokeStyle = `rgba(255,255,255,${alpha})`;
          ctx.strokeRect(x, y, squareSize, squareSize);
        }
      }

      requestAnimationFrame(draw);
    };

    const onMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current.x = e.clientX - rect.left;
      mouse.current.y = e.clientY - rect.top;
    };

    window.addEventListener("mousemove", onMouseMove);
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, [squareSize, speed]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
}
