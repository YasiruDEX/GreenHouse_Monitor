import requests

url = "https://raw.githubusercontent.com/YasiruDEX/GreenHouse_Monitor/main/link.txt"

response = requests.get(url)

if response.status_code == 200:
    content = response.text
    print("📄 File content:\n", content)
else:
    print(f"❌ Failed to fetch file. Status code: {response.status_code}")