import { NextResponse } from "next/server";

export async function GET() {
		const swScript = `
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js', { updateViaCache: 'none' }).catch(() => {});
  });
}
  `.trim();

	return new NextResponse(swScript, {
		headers: { "Content-Type": "application/javascript" },
	});
}
