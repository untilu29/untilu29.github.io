const x = document.getElementById("box").offsetWidth;
const y = document.getElementById("box").offsetHeight;
const height = window.innerHeight - y;
const width = window.innerWidth - x;

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}
function changeBtn() {
  let valueHeight = getRandomInt(0, height);
  let valueWidth = getRandomInt(0, width);
  document.getElementById("box").style.marginTop = valueHeight + "px";
  document.getElementById("box").style.marginLeft = valueWidth + "px";
}
function process() {
  // Get the current date and time
  let currentTime = new Date().toISOString();

  // Upsert a row in the 'timeline' table
  window.supabase
    .from('timeline')
    .upsert([
      { sprint: 'acceptedGirlFriend', time: currentTime, updated_at: currentTime}
    ], { returning: 'minimal' }) // Don't return the inserted row
    .then(response => {
      if (response.error) {
        console.error(response.error.message);
      } else {
        console.log('Your girlfriend has been accepted, congratulations!');
      }
    });

  setTimeout(() => {
    location.href = "/valentine/";
  }, 2000);
}
