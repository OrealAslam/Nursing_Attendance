package com.nursingattendance;

import android.app.Activity;
import android.content.Intent;
import android.database.Cursor;
import android.net.Uri;
import android.os.Build;
import android.provider.MediaStore;
import android.util.Log;
import androidx.annotation.Nullable;
import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.BaseActivityEventListener;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class ImagePickerModule extends ReactContextBaseJavaModule {

  private static final int IMAGE_PICKER_REQUEST = 1;
  private Promise imagePickerPromise;
  private final ReactApplicationContext reactContext;
  private final ActivityEventListener activityEventListener = new BaseActivityEventListener() {
    @Override
    public void onActivityResult(
      Activity activity,
      int requestCode,
      int resultCode,
      Intent data
    ) {
      if (requestCode == IMAGE_PICKER_REQUEST) {
        if (resultCode == Activity.RESULT_OK) {
          Uri selectedImage = data.getData();
          String[] filePathColumn = { MediaStore.Images.Media.DATA };
          Cursor cursor = reactContext
            .getContentResolver()
            .query(selectedImage, filePathColumn, null, null, null);
          if (cursor != null) {
            cursor.moveToFirst();
            int columnIndex = cursor.getColumnIndex(filePathColumn[0]);
            String imagePath = cursor.getString(columnIndex);
            cursor.close();
            imagePickerPromise.resolve(imagePath);
          } else {
            imagePickerPromise.reject(
              "IMAGE_PICKER_ERROR",
              "Failed to get image path"
            );
          }
        } else {
          imagePickerPromise.reject(
            "IMAGE_PICKER_CANCELLED",
            "Image picker was cancelled"
          );
        }
      }
    }
  };

  public ImagePickerModule(ReactApplicationContext reactContext) {
    super(reactContext);
    this.reactContext = reactContext;
    reactContext.addActivityEventListener(activityEventListener);
  }

  @Override
  public String getName() {
    return "ImagePickerModule";
  }

  @ReactMethod
  public void selectImage(Promise promise) {
    imagePickerPromise = promise;
    Intent galleryIntent = new Intent(
      Intent.ACTION_PICK,
      MediaStore.Images.Media.EXTERNAL_CONTENT_URI
    );
    galleryIntent.setType("image/*");
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP_MR1) {
      galleryIntent.putExtra(Intent.EXTRA_ALLOW_MULTIPLE, false);
    }
    if (
      galleryIntent.resolveActivity(reactContext.getPackageManager()) != null
    ) {
      reactContext.startActivityForResult(
        galleryIntent,
        IMAGE_PICKER_REQUEST,
        null
      );
    } else {
      imagePickerPromise.reject("IMAGE_PICKER_ERROR", "No gallery app found");
    }
  }
}
