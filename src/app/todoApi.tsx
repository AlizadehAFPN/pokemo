

export async function getList() {

  try{
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      return await response;
  }catch(error) {
      return [];
  }
  
}