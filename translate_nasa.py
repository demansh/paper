import os
import logging
from google import genai
from dotenv import load_dotenv

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)
load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
NASA_GEMINI_PROMPT = os.getenv("NASA_GEMINI_PROMPT")
NASA_GEMINI_MODEL = os.getenv("NASA_GEMINI_MODEL")

client = genai.Client(api_key=GEMINI_API_KEY)

def translate_to_russian(text: str) -> str:
    """
    Receives raw English text and returns raw Russian translation.
    Optimized for pop-science context.
    """
    if not text or not GEMINI_API_KEY:
        logger.warning("Translation skipped: Missing text or API Key.")
        return ""

    prompt = (
        f"{NASA_GEMINI_PROMPT}"
        "\n\n"
        f"{text}"
    )

    response = client.models.generate_content(
        model=NASA_GEMINI_MODEL,
        contents=prompt
    )
    
    return response.text.strip()