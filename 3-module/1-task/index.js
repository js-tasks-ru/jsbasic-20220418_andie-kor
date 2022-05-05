function namify(users) {
  let result = [];

  users.map((value) => {
    result.push(value.name);
  });

  return result;
}
