<template>
  <div >
    <h1> Alicia's Chinese Restaurant </h1>
    <ul>
      <li><router-link to="/">Home</router-link></li>
      <li><router-link to="/Orders">Orders</router-link></li>
      <li><router-link to="/Dashboard">Dashboard</router-link></li>
    </ul>
  </div>
</template>

<script>
</script>

<style scoped>
ul {
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0;
}
li {
  flex-grow: 1;
  flex-basis: 300px;
  text-align: center;
  padding: 10px;
  border: 1px solid #222;
  margin: 10px;
  height:40px;
}
</style>
