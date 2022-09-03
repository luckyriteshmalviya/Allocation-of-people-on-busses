// Solution

function do_allocation(people, busses) {
  let numberOfBusses = busses;

  if (busses == 1) {
    let arr = [people];
    return arr;
  }

  let arr = [1]; // for first Buss (by Default)

  people = people - 1; // Remaining people
  busses = busses - 1; // Remaining Busses

  let secondBuss = Math.round(people / busses);
  if (secondBuss > 1 && busses > 1) {
    secondBuss = secondBuss - 1;
  }

  // People got into Second buss
  arr.push(secondBuss);

  people = people - secondBuss; // Remaining people
  busses = busses - 1; // Remaining busses

  // Calculation for other busses
  while (people >= 0) {
    // Sum of number of peoples in last two busses
    let sum = arr[arr.length - 2] + arr[arr.length - 1];
    if (sum > people) {
      arr.push(people);
    } else {
      arr.push(sum);
    }
    people = people - sum;
    busses = busses - 1;
  }

  // Condition for extra busses
  if (arr.length < numberOfBusses) {
    let extra = numberOfBusses - arr.length;
    for (let i = 0; i < extra; i++) {
      arr.push(0);
    }
  }

  //Condition for extra people
  if (arr.length > numberOfBusses) {
    let extra = arr.length - numberOfBusses;
    for (let i = 0; i < extra; i++) {
      arr.pop();
    }
  }
  return arr;
}

document.getElementById("button").addEventListener("click", () => {
  // Value from the inputs
  const people = document.getElementById("people").value;
  const busses = document.getElementById("busses").value;

  if (people == 0 || busses == 0) {
    return alert("Please insert valid input");
  }

  if (people && busses) {
    let bussesNumber = 1;
    const result = do_allocation(people, busses);
    const printResult = document.getElementById("result");
    printResult.innerText = "";

    const fragment = document.createDocumentFragment();

    // Iterating the loop over the array of result
    for (let i = 0; i < result.length; i++) {
      const divContainer = document.createElement("div");

      // Inserting the result inside the div
      divContainer.innerHTML = `<span class="list">${bussesNumber}</span><span class="list">${result[i]}</span>`;

      fragment.appendChild(divContainer);
      bussesNumber += 1;
    }
    //Appending the fragment conainer inside the DOM
    printResult.appendChild(fragment);
  } else {
    // Alert in case of blank inputs
    return alert("Both fields are necessary");
  }
});
