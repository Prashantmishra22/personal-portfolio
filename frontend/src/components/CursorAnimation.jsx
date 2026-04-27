import { useEffect, useState } from 'react';

export default function CursorAnimation() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [follower, setFollower] = useState({ x: 0, y: 0 });
  const [clicking, setClicking] = useState(false);

  useEffect(() => {
    const moveCursor = (e) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  useEffect(() => {
    const lerp = (a, b, t) => a + (b - a) * t;
    let animId;
    let fx = follower.x, fy = follower.y;
    const animate = () => {
      fx = lerp(fx, pos.x, 0.12);
      fy = lerp(fy, pos.y, 0.12);
      setFollower({ x: fx, y: fy });
      animId = requestAnimationFrame(animate);
    };
    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, [pos]);

  useEffect(() => {
    const down = () => setClicking(true);
    const up = () => setClicking(false);
    window.addEventListener('mousedown', down);
    window.addEventListener('mouseup', up);
    return () => { window.removeEventListener('mousedown', down); window.removeEventListener('mouseup', up); };
  }, []);

  return (
    <>
      <div className="cursor" style={{
        transform: `translate(${pos.x - 6}px, ${pos.y - 6}px) scale(${clicking ? 0.5 : 1})`,
      }} />
      <div className="cursor-follower" style={{
        transform: `translate(${follower.x - 18}px, ${follower.y - 18}px) scale(${clicking ? 1.5 : 1})`,
        opacity: clicking ? 0.5 : 1,
      }} />
    </>
  );
}
