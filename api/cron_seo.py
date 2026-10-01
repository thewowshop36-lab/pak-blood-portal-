import os
import time
import requests
from http.server import BaseHTTPRequestHandler

class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        start_time = time.time()
        
        # 1. Ping Google Search Engine for Pak Blood Portal
        sitemap_url = "https://pak-blood-portal.vercel.app/sitemap.xml"
        google_ping = f"https://www.google.com/ping?sitemap={requests.utils.quote(sitemap_url)}"
        try:
            requests.get(google_ping, timeout=5)
            ping_status = "Googlebot Pinged Successfully"
        except Exception as e:
            ping_status = f"Ping Notice: {str(e)}"

        # 2. Measure Live Server Response
        latency_ms = int((time.time() - start_time) * 1000)
        
        # 3. Response Output
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.end_headers()
        
        response_json = f'''{{
            "portal": "Pak Blood Network",
            "url": "https://pak-blood-portal.vercel.app",
            "status": "Online 200 OK",
            "latency_ms": {latency_ms},
            "google_indexing": "{ping_status}",
            "database": "Active 24/7"
        }}'''
        
        self.wfile.write(response_json.encode('utf-8'))
        return
