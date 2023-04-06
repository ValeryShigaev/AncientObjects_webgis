
export async function getObjects(){
    const response = await fetch("/api/objects/")
    if(response.status == 200){
        return response.json()
    }else{
        return false
    }
}

export async function createObject(form){
const params = {
    "name": form.name,
    "region": 16,
    "district": form.district,
    "type": form.type,
    "av_order": form.av_order,
    "status": "regional",
    "pos": 0,
    "notes": form.notes,
    "x": form.X,
    "y": form.Y
  }
  const options = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(params)
  }
  const data = await fetch('/api/objects/create', options);
  if(data.status == 201){
    return true;
  }
  return false;
}

export async function moveObject(fid, x, y){
  const params ={
        "x": x,
        "y": y
      }
  const options = {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(params)
  }
  const data = await fetch(`/api/objects/move/${fid}`, options);
  if(data.status == 200){
    return true;
  }
  return false;
}

export async function deleteObject(fid){
  const options = {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }
  const data = await fetch(`/api/objects/delete/${fid}`, options);
  if(data.status == 204){
    return true;
  }
  return false;
}

export async function updateObject(fid, form){
  const params ={
    "name": form.name,
    "district": form.district,
    "type": form.type,
    "av_order": form.av_order,
    "notes": form.notes,
  }
  const options = {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(params)
  }
  const data = await fetch(`/api/objects/update/${fid}`, options);
  console.log(data.status);
  if(data.status == 200){
    return true;
  }
  return false;
}
