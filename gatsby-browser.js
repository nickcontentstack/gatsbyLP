/**
 * Display a custom message once your service worker finds an update
 * The following code will display a confirm prompt asking the user whether they
 * would like to refresh the page when an update is found.
 */

export const onServiceWorkerUpdateReady = () => {
  const answer = window.confirm(
    `This application has been updated. ` +
      `Reload to display the latest version?`
  )
  if (answer === true) {
    window.location.reload()
  }
}
