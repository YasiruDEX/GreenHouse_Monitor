import requests
import time

timestamp = int(time.time())
url = f"https://raw.githubusercontent.com/YasiruDEX/GreenHouse_Monitor/main/link.txt?nocache={timestamp}"

headers = {
    "Cache-Control": "no-cache",
    "Pragma": "no-cache"
}

response = requests.get(url, headers=headers)

if response.status_code == 200:
    content = response.text.strip()
    print("📄 File content:\n", content)
else:
    print(f"❌ Failed to fetch file. Status code: {response.status_code}")