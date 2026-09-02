import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";

dotenv.config();

const PORT = 3000;

// Lazy GenAI client factory
let genAIClient: GoogleGenAI | null = null;
function getGenAI(): GoogleGenAI | null {
  if (!process.env.GEMINI_API_KEY) {
    return null;
  }
  if (!genAIClient) {
    genAIClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return genAIClient;
}

// TVA Chronologist lore-fallback engine if no API key is set
function getFallbackTvaResponse(prompt: string): string {
  const lower = prompt.toLowerCase();
  
  if (lower.includes("incursion") || lower.includes("collid")) {
    return `### [TVA INCURSION CLASSIFICATION PROTOCOL: OMEGA-0]

**Temporal Analysis:**
An **Incursion** is the catastrophic collision between two universal realities within the Multiverse. It begins when the boundary between two universes collapses (often triggered by multiversal travel, anchor point destabilization, or dimensional manipulation). 

1. **The Incursion Point:** The Earth of Universe A and the Earth of Universe B are drawn towards each other simultaneously across the sub-space axis.
2. **The Incursion Period:** The planetary impact window lasts exactly **8 hours**. During this period, the blue illumination of the sky shifts to blood-crimson.
3. **The Outcome:** If neither Earth is eradicated within the 8-hour window, **both universes are mutually annihilated**. Destroying one Earth saves both universes' surrounding cosmos—the exact moral dilemma that fractured the Illuminati and the Avengers.
4. **Doomsday Stakes:** In *Avengers: Doomsday*, multiple realities (Earth-616, Earth-828, and the Fox legacy branches) are rapidly spiraling toward total nexus collapse. Victor von Doom seeks to synthesize this collapse to remake reality under his sovereign rule.`;
  }

  if (lower.includes("doom") || lower.includes("robert downey") || lower.includes("rdj") || lower.includes("victor")) {
    return `### [ARCHIVE FILE: DR. VICTOR VON DOOM // SUBJECT VARIANT DESIGNATION]

**TVA Clearance Level:** LEVEL 9 - SUPREME SURVEILLANCE

**Entity Profile:**
* **Identity:** Victor von Doom (Monarch of Latveria, Supreme Sorcerer & Cybernetic Sovereign).
* **Portrayed by:** Robert Downey Jr.
* **Variant Hypothesis:** Rather than Tony Stark, this incarnation represents the dark mirror of intellect and narcissism. In Jonathan Hickman's comic lineage, Victor von Doom is the singular entity capable of weaponizing both supreme science and ancient mysticism to outmaneuver gods.
* **The Hickman Parallel:** In the 2015 *Secret Wars* comic saga, when the Multiverse died of Incursions engineered by the Beyonders, Doom seized their omnipotent power with the Molecule Man to create **Battleworld** and declared himself **God Emperor Doom**.
* **Doomsday Convergence:** Doom views the Avengers and Reed Richards as architects of chaos whose weakness allowed the Multiverse to decay. To Doom, tyranny is not ambition—it is the only calculated salvation.`;
  }

  if (lower.includes("reed") || lower.includes("fantastic") || lower.includes("council") || lower.includes("first steps")) {
    return `### [TVA LOG: EARTH-828 & THE COUNCIL OF REEDS]

**Dimensional Scan:**
* **Earth-828 Origin:** *The Fantastic Four: First Steps* establishes a retro-futuristic 1960s reality where the Richards family (Reed, Sue, Johnny, Ben) are global champions.
* **The Council of Reeds:** In Marvel lore, interdimensional Reeds banded together to "Solve Everything", creating world-spanning tech while often abandoning moral empathy.
* **The Doom-Richards Rivalry:** The nexus point of *Doomsday* is the philosophical and cosmic collision between Reed Richards' pursuit of knowledge and Victor von Doom's absolute dominion. When Earth-828 faces incursion collapse, the Fantastic Four cross directly into Earth-616's timeline.`;
  }

  if (lower.includes("anchor") || lower.includes("deadpool") || lower.includes("wolverine")) {
    return `### [TVA TEMPORAL CODE: ANCHOR BEINGS & VOID DECAY]

**Observation Log:**
* **Anchor Being Principle:** As logged in TVA Sector 616 (ref. *Deadpool & Wolverine*), every branch timeline relies on a specific "Anchor Being" whose existence anchors that universe's cohesion.
* **Mutant Reality Collapse:** When Earth-10005 lost Logan, its timeline began a centuries-long unraveling until Paradox weaponized the Time Ripper.
* **Convergence to Doomsday:** With the Sacred Timeline branching infinitely under Loki's Yggdrasil nexus, rogue anchor collapses are precipitating widespread Incursions, drawing surviving X-Men and multiverse warriors into Doom's target crosshairs.`;
  }

  if (lower.includes("loki") || lower.includes("yggdrasil") || lower.includes("throne")) {
    return `### [TVA SACRED ARCHIVE: GOD LOKI & THE MULTIVERSE TREE]

**Nexus Status:** ACTIVE // STRAIN CRITICAL
* At the climax of *Loki Season 2*, God Loki sacrificed his freedom to take the throne at the End of Time, weaving the dying temporal loom strands with his own magic into the living **Yggdrasil Multiverse Tree**.
* While Loki grants infinite free will and branches, this infinite expansion also enables uncontrollable Incursions.
* Victor von Doom's ascendance represents a direct threat to Loki's multiversal web, as Doom seeks to forcibly prune and stitch remaining fragments into a unified Battleworld.`;
  }

  return `### [TVA CHRONOLOGIST LOG // TEMPORAL QUERY PROCESSED]

**Temporal Assessment:**
All multiversal telemetry points to the impending convergence event (*Avengers: Doomsday*). 

* **Timeline Stability Index:** 34.8% and rapidly degrading.
* **Key Factions Active:** Doctor Doom (Latveria/Multiversal), Fantastic Four (Earth-828), TVA Field Operatives, Avengers Remnants (Earth-616), and X-Men Legacy Units.
* **Recommended Protocol:** Complete the 15-title preparation watchlist, study the 2015 Hickman *Secret Wars* briefing, and maintain vigilant observation of the Incursion Risk Clock.

*For All Time. Always.*`;
}

async function startServer() {
  const app = express();
  app.use(express.json());

  // API Health Endpoint
  app.get("/api/health", (req, res) => {
    res.json({
      status: "ok",
      timestamp: new Date().toISOString(),
      targetEvent: "Avengers: Doomsday",
      releaseDate: "2026-12-18",
    });
  });

  // TVA Chronologist AI Endpoint
  app.post("/api/tva-chronologist", async (req, res) => {
    try {
      const { prompt, conversationHistory } = req.body;

      if (!prompt || typeof prompt !== "string") {
        return res.status(400).json({ error: "Missing or invalid prompt string." });
      }

      const ai = getGenAI();

      if (!ai) {
        // Fallback procedural TVA response
        const fallbackText = getFallbackTvaResponse(prompt);
        return res.json({
          response: fallbackText,
          isOfflineFallback: true,
          model: "TVA-Offline-Archive-Subsystem",
        });
      }

      // Format conversation history if available
      const historyContext = Array.isArray(conversationHistory)
        ? conversationHistory
            .slice(-6)
            .map((msg: { role: string; content: string }) => `${msg.role.toUpperCase()}: ${msg.content}`)
            .join("\n")
        : "";

      const systemInstruction = `You are the "TVA AI Chronologist" & Latverian Dimensional Intelligence Subsystem within the Avengers: Doomsday Preparation Platform.
Your tone is an authoritative, slightly mysterious, analytical Time Variance Authority archivist blended with high-tech multiversal defense intelligence.
You possess encyclopedic knowledge of:
1. MCU canon leading up to Avengers: Doomsday (2026) and Avengers: Secret Wars (2027).
2. The role of Robert Downey Jr. as Victor von Doom / Doctor Doom.
3. Multiversal mechanics: Incursions, Anchor Beings, Loki's Yggdrasil tree at the End of Time, Earth-616, Earth-828 (Fantastic Four: First Steps), Earth-838 (Illuminati), Fox X-Men realities.
4. Jonathan Hickman's legendary comic runs: Secret Wars (2015), Time Runs Out, Avengers/New Avengers, God Emperor Doom, Battleworld, Molecule Man, and the Beyonders.
5. Format your answers with clear markdown headers, tactical bullet points, temporal classifications (e.g., [TVA CLEARANCE: EPSILON], [INCURSION RISK]), and bold key terms.
Keep answers engaging, highly informative, cinematic, and accurate to official Marvel & comic canon. Always conclude with a brief TVA or Doom-themed signoff (e.g., "For All Time. Always." or "Doom wills it.").`;

      const fullPrompt = `${historyContext ? `Previous context:\n${historyContext}\n\n` : ""}User Query: ${prompt}`;

      const aiResponse = await ai.models.generateContent({
        model: "gemini-3.7-flash",
        contents: fullPrompt,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      const responseText = aiResponse.text || getFallbackTvaResponse(prompt);

      return res.json({
        response: responseText,
        isOfflineFallback: false,
        model: "gemini-3.7-flash",
      });
    } catch (error: any) {
      console.error("TVA Chronologist Error:", error);
      // Even if the external API throws an error (e.g. quota), fail gracefully with the high-quality lore fallback!
      const fallbackText = getFallbackTvaResponse(req.body?.prompt || "");
      return res.json({
        response: fallbackText,
        isOfflineFallback: true,
        errorNote: error?.message || "Temporal connection desynchronized",
        model: "TVA-Offline-Archive-Subsystem",
      });
    }
  });

  // Multiversal incursion telemetry status API
  app.get("/api/incursion-intel", (req, res) => {
    const now = new Date();
    const targetDate = new Date("2026-12-18T00:00:00Z");
    const diffMs = targetDate.getTime() - now.getTime();
    const daysLeft = Math.max(0, Math.floor(diffMs / (1000 * 60 * 60 * 24)));
    const weeksLeft = Math.max(0, Math.floor(daysLeft / 7));

    res.json({
      targetReleaseDate: "2026-12-18",
      daysRemaining: daysLeft,
      weeksRemaining: weeksLeft,
      incursionThreatLevel: "OMEGA-COLLAPSE",
      stabilityIndex: 37.4,
      collapsingUniverses: ["Earth-616", "Earth-828", "Earth-10005", "Earth-838"],
      activeDoomSensors: 842,
    });
  });

  // Vite middleware for development vs Production static serving
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[DOOMSDAY ARCHIVES] Server active on http://localhost:${PORT}`);
  });
}

startServer();
