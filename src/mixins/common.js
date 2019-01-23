export default {
  methods: {
    _registerBackListener() {
      if (typeof(globalEvent) !== 'undefined') {
        globalEvent.addEventListener("androidback", () => {
          this.$pop();
        });
      }
    }
  }
}
