package com.aiastudio.pakbloodportal;

import android.app.Activity;
import android.os.Bundle;
import android.webkit.WebView;
import android.webkit.WebViewClient;

public class MainActivity extends Activity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        WebView webView = new WebView(this);
        webView.getSettings().setJavaScriptEnabled(true);
        webView.setWebViewClient(new WebViewClient());
        // Yahan apni website ka link likha hai
        webView.loadUrl("https://pak-blood-portal.vercel.app");
        setContentView(webView);
    }
}
