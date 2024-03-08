const modalElement = document.getElementById("myModal");
const sendingDataElement = document.getElementById("submit");
const buttonReloadElement = document.getElementById("get-req");
const closeModalElement = document.querySelector(".modal-button");
const input = document.getElementById("input");

function lists(responseData) {
  let listData = "";
  responseData.map((list, index) => {
    listData += `
      <div class="list">
      <p>${index + 1}.${list.name}</p>
      <div class="edit-delete">
      <button class="button-edit" onclick="editList(${index})">edit</button>
      <button class="button-delete"" onclick="deleteList(event,${index})">delete</button>
      </div>
      </div>`;
  });
  return listData;
}
async function reloadData() {
  // get request
  try {
    const response = await fetch("/lists");
    if (!response.ok) {
      alert("fetching failed");
    }
    const responseData = await response.json();
    if (responseData && responseData.length > 0) {
      const listData = lists(responseData);
      document.querySelector(".list-container").innerHTML = listData;
    } else {
      document.querySelector(".list-container").innerHTML = "No Data";
    }
  } catch (err) {
    alert("Error in the system");
  }
}

async function postReq(event) {
  // post request
  event.preventDefault();
  if (input.value === null || input.value === "") {
    return (modalElement.style.display = "block");
  }
  try {
    const response = await fetch("/post", {
      method: "POST",
      body: JSON.stringify({ name: input.value }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    input.value = "";
    if (!response.ok) {
    } else {
      reloadData();
    }
  } catch (err) {
    console.log(err);
  }
}

async function deleteList(event, index) {
  // delete request
  console.log(event);
  const response = await fetch("/delete", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ index: index }),
  });

  if (response.ok) {
    reloadData();
  }
}

async function patchReq(index, value) {
  const response = await fetch("/patches", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      index: index,
      name: value,
    }),
  });
  if (response.ok) {
    reloadData();
  }
}
async function editList(index) {
  // patch request
  const edit = document.querySelectorAll(".button-edit")[index];
  const list = document.querySelectorAll(".list")[index];
  const input = document.createElement("input");
  if (edit.innerHTML === "edit") {
    edit.innerHTML = "save";
    list.firstElementChild.remove();
    list.prepend(input);
  } else {
    if (
      list.firstElementChild.value === null ||
      list.firstElementChild.value === ""
    ) {
      return (modalElement.style.display = "block");
    }
    edit.innerHTML = "edit";
    await patchReq(index, list.firstElementChild.value);
  }
}

closeModalElement.onclick = function () {
  modalElement.style.display = "none";
};

sendingDataElement.addEventListener("submit", postReq);
buttonReloadElement.addEventListener("click", reloadData);
