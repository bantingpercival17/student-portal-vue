<template>
  <div>
    <button @click="captureAndSaveScreenshot">Capture and Save Screenshot</button>
  </div>
</template>

<script>
import html2canvas from 'html2canvas';
import axios from 'axios';

export default {
  methods: {
    captureAndSaveScreenshot() {
      html2canvas(document.body).then(canvas => {
        // Convert canvas to base64 image data
        const imageData = canvas.toDataURL('image/png');

        // Send screenshot data to server
        axios.post('/api/save-screenshot', {
          imageData: imageData
        }).then(response => {
          console.log('Screenshot saved successfully:', response.data);
        }).catch(error => {
          console.error('Error saving screenshot:', error);
        });
      });
    }
  }
}
</script>
