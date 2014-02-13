package fr.smile.mobile.appinstaller;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.PluginResult;

import org.json.JSONArray;
import org.json.JSONException;

import android.app.Activity;
import android.content.Intent;
import android.net.Uri;

public class CDVAppInstaller extends CordovaPlugin {
    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        if ("install".equals(action)) {
            String path = args.getString(0);
            this.install(path, callbackContext);
            return true;
        }
        return false;
    }

    private void install(String path, CallbackContext callbackContext) {
        try {
            Intent intent = new Intent(Intent.ACTION_VIEW).setDataAndType(Uri.parse("file:///sdcard/"+path), "application/vnd.android.package-archive");
            intent.addFlags(intent.FLAG_ACTIVITY_NEW_TASK);
            cordova.getActivity().startActivity(intent);
            callbackContext.success();
        } catch(Exception e) {
            callbackContext.error(e.toString());
        }
    }
}
