export default function Background() {
  return (
    <div
      className="fixed inset-0 overflow-hidden bg-black pointer-events-none"
      style={{ zIndex: -1 }}
    >
      <div
        className="absolute inset-0 opacity-100"
        style={{
          background:
            "radial-gradient(circle at 50% 60%, rgba(79, 140, 255, 0.18), transparent 60%)",
        }}
      />

      <div
        className="animate-blob-1 absolute rounded-full"
        style={{
          top: "-20%",
          right: "-10%",
          width: "60vw",
          height: "60vw",
          opacity: 0.45,
          background:
            "radial-gradient(circle at center, rgba(79, 140, 255, 0.25) 0%, rgba(79, 140, 255, 0.06) 45%, transparent 70%)",
        }}
      />

      <div
        className="animate-blob-2 absolute rounded-full"
        style={{
          bottom: "-25%",
          left: "-15%",
          width: "65vw",
          height: "65vw",
          opacity: 0.45,
          background:
            "radial-gradient(circle at center, rgba(135, 198, 232, 0.2) 0%, rgba(135, 198, 232, 0.05) 45%, transparent 70%)",
        }}
      />

      <div
        className="animate-blob-3 absolute rounded-full"
        style={{
          top: "30%",
          left: "20%",
          height: "40vw",
          opacity: 0.25,
          background:
            "radial-gradient(circle at center, rgba(79, 140, 255, 0.08) 0%, rgba(79, 140, 255, 0.02) 45%, transparent 70%)",
        }}
      />

      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(0, 0, 0, 0.6) 100%)",
        }}
      />
    </div>
  );
}
