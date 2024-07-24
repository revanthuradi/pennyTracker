function getGreeting() {
  const now = new Date();
  const hours = now.getHours();
  let greeting;

  if (hours >= 0 && hours < 12) {
    greeting = "Good Morning";
  } else if (hours >= 12 && hours < 17) {
    greeting = "Good Afternoon";
  } else if (hours >= 17 && hours < 21) {
    greeting = "Good Evening";
  } else {
    greeting = "Good Night";
  }

  return greeting;
}

export default getGreeting;
