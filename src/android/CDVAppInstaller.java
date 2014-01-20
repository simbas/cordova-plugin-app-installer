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
        if (action.equals("install")) {
            String uri = args.getString(0);
            this.install(uri, callbackContext);
            callbackContext.sendPluginResult(new PluginResult(PluginResult.Status.OK));
            return true;
        }
        return false;
    }

    private void install(String uri, CallbackContext callbackContext) {
        Intent intent = new Intent(Intent.ACTION_VIEW).setDataAndType(Uri.parse(uri), "application/vnd.android.package-archive");
        intent.addFlags(intent.FLAG_ACTIVITY_NEW_TASK);
        cordova.getActivity().startActivity(intent);
    }
}