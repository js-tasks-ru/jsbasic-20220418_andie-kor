function showSalary(users, age) {
  let userString = '';

  users.map((user) => {
    if (user.age <= age){
      if (userString.length) userString += '\n';
      userString += (`${user.name}, ${user.balance}`);
    }
  });
  
  return userString;
}