export function KotlinIcon() {
  return (
    <div
      className="flex size-10 shrink-0 items-center justify-center rounded-xl"
      style={{ backgroundColor: "#F3EEFF" }}
    >
      <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" className="size-6">
        <defs>
          <radialGradient id="kotlin-a" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(48 -1.13738e-06) rotate(180) scale(48)">
            <stop stopColor="#E44857" />
            <stop offset="0.504494" stopColor="#C711E1" />
            <stop offset="1" stopColor="#7F52FF" />
          </radialGradient>
        </defs>
        <path d="M48 48H0V0H48L23.505 23.6475L48 48Z" fill="url(#kotlin-a)" />
      </svg>
    </div>
  );
}
