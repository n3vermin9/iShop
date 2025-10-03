import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import os from "os";

function getLocalIp() {
  const interfaces = os.networkInterfaces();
  for (const name in interfaces) {
    for (const iface of interfaces[name]) {
      if (iface.family === "IPv4" && !iface.internal) {
        return iface.address;
      }
    }
  }
  return "127.0.0.1";
}

export default defineConfig({
  plugins: [react()],
  base: "/iShop/",
  server: {
    host: true,
    port: 5173,
    configureServer(server) {
      server.httpServer?.once("listening", () => {
        const ip = getLocalIp();
        console.log(`\n  Local IP: http://${ip}:5173\n`);
      });
    },
  },
});
