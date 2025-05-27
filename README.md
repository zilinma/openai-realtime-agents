# OpenAI Realtime Agents - Assisted Living Placement

A comprehensive AI-powered platform to assist with elder care placement through three specialized AI agents:

1. **Information Collector**: Gathers patient details from caregivers during initial assessment
2. **Booking Agent**: Makes calls to facilities as a placement coordinator seeking placement
3. **Check-In Agent**: Monitors caregiver burnout through regular wellness checks
4. **Discharge Care Plan Generator**: Creates detailed care plans for patients transitioning from hospital to home care

## Features

- **Real-time voice conversations** with specialized AI agents
- **Dynamic patient information** collection and tracking
- **Facility booking coordination** with roleplaying guides
- **Caregiver burnout assessment** tracking and support
- **Insurance document analysis** for coverage details
- **Discharge care plan generation** for post-hospitalization patients

## Local Development

1. Clone the repository:
```bash
git clone https://github.com/yourusername/openai-realtime-agents.git
cd openai-realtime-agents
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file with:
```
OPENAI_API_KEY=your_api_key_here
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Deployment Options

### Vercel (Recommended)

1. Install the Vercel CLI:
```bash
npm install -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy the application:
```bash
vercel
```

4. For production deployment:
```bash
vercel --prod
```

### Netlify

1. Install the Netlify CLI:
```bash
npm install -g netlify-cli
```

2. Login and deploy:
```bash
netlify login
netlify deploy
```

### Docker

1. Build the Docker image:
```bash
docker build -t openai-realtime-agents .
```

2. Run the container:
```bash
docker run -p 3000:3000 -e OPENAI_API_KEY=your_api_key_here openai-realtime-agents
```

## License

MIT
