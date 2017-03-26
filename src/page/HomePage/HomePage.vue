<style src="./HomePage.scss" module lang="scss"></style>
<script src="./HomePage.js"></script>

<template>
	<div>
		<h2>HomePage</h2>
		<input :value="firstName" @input="setFirstName($event.target.value)"/>
		<input :value="lastName" @input="setLastName($event.target.value)"/>

		<p>{{firstName}}</p>
		<p>{{lastName}}</p>
	</div>
</template>

