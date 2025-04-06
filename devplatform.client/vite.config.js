import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import plugin from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import child_process from 'child_process';
import { env } from 'process';

const certPath = "certs/devplatform.client.pem";
const keyPath = "certs/devplatform.client.key";

if (!fs.existsSync(certPath) || !fs.existsSync(keyPath)) {
    throw new Error("SSL ����������� �� ������� � ����������!");
}

const target = env.ASPNETCORE_HTTPS_PORT ? `https://localhost:${env.ASPNETCORE_HTTPS_PORT}` :
    env.ASPNETCORE_URLS ? env.ASPNETCORE_URLS.split(';')[0] : 'https://localhost:7228';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [plugin()],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    server: {
        proxy: {
            '/api': {
                target,
                secure: false
            }
        },
        port: 58604,
        https: {
            key: fs.readFileSync(keyPath),
            cert: fs.readFileSync(certPath),
        }
    }
})
