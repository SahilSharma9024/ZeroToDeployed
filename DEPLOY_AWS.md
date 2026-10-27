# 🚀 KinetiQ — AWS Linux Deployment & Production Hosting Guide

This guide details how to host KinetiQ on your AWS Linux EC2 instance on **Port 80** with 24/7 background uptime, native SQLite, OpenStreetMap geocoding, and HindSight AI persistent memory.

---

## 📋 1. AWS EC2 Security Group Prerequisites
Before deploying, make sure your EC2 instance security group allows inbound traffic on:
* **Port 80 (HTTP)** — For public web and API access (`0.0.0.0/0`)
* **Port 22 (SSH)** — For terminal access
* *(Optional)* **Port 443 (HTTPS)** — If adding an SSL certificate (Certbot / Let's Encrypt)

---

## 🛠️ 2. First-Time Setup on AWS Linux Instance

SSH into your AWS instance:
```bash
ssh -i your-key.pem ubuntu@your-ec2-public-ip
```

### Step 2.1: Install Node.js (v22 or v24 Recommended)
```bash
# Update package lists
sudo apt update && sudo apt upgrade -y

# Install Node.js 22 LTS
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs git

# Verify installation (Ensure Node >= 20.0.0 for node:sqlite support)
node -v
npm -v

# Install PM2 globally for background process supervision
sudo npm install -g pm2
```

### Step 2.2: Clone or Pull the `feature/13-HindSight` Branch
```bash
# Clone the repository
git clone https://github.com/your-org/ZeroToDeployed.git KinetiQ
cd KinetiQ

# Switch to the active development branch
git checkout feature/13-HindSight
git pull origin feature/13-HindSight
```

### Step 2.3: Install Dependencies & Build Frontend
```bash
npm install
npm run build
```
*(This creates the optimized `dist/` production bundle).*

### Step 2.4: Configure `.env`
Create your production `.env` file:
```bash
cp .env.example .env
nano .env
```

Ensure your `.env` contains:
```env
# Set PORT to 80 for standard web traffic
PORT=80
NODE_ENV=production

# JWT Authentication Secret
JWT_SECRET=KinetiQ_super_secret_jwt_2026_sports_os

# Groq LLM Inference (Free at console.groq.com)
GROQ_API_KEY=gsk_...
GROQ_MODEL=llama-3.3-70b-versatile

# Vectorize Hindsight Persistent Agent Memory
HINDSIGHT_API_KEY=hnd_...
HINDSIGHT_ENDPOINT=https://api.hindsight.vectorize.io
```

---

## 🏃 3. Start the Application on Port 80

### Allow Node.js to Bind to Port 80 Without Sudo:
```bash
sudo setcap 'cap_net_bind_service=+ep' `which node`
```

### Run with PM2 (24/7 Production Process Manager)
```bash
# Start using the pre-configured ecosystem file
pm2 start ecosystem.config.cjs

# Save PM2 process list so it restarts automatically if the server reboots
pm2 save
pm2 startup
```

### Check Logs & Status:
```bash
pm2 status
pm2 logs KinetiQ-app
```

---

## 🌐 4. Test in Browser
Visit your EC2 public IP or domain in any browser:
```
http://your-ec2-public-ip
```

1. You will be greeted by the **Athlete Sign In / Registration Gate**.
2. Click **1-Click Enter** or register a new athlete account.
3. Access real OpenStreetMap gyms & turfs with live distance calculation.
4. Open the **HindSight AI Coach** to test persistent memory with safety guardrails.

