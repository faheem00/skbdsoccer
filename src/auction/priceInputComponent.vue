<template>
	<input type="text" :value="value" class="form-control" @keyup.up="onUp" @keyup.down="onDown" :disabled="disabled">
</template>

<script>
export default {
	props: ['value'],
	data() {
		return {			
			disabled: false,
			step: 5
		}
	},
	mounted(){
		if(this.value == null)
			this.value = 5;
		else if(this.value > 30)
			this.step = 10;
		else this.step = 5;
	},
	methods: {
		onUp(event) {
			console.log('bla');
			this.disabled = true;	
			if(this.value >= 5 && this.value < 150){
				if(this.value == 30)
					this.step = 10;			
				this.value += this.step;	
			}
			this.$emit('input',this.value);
			this.$emit('on_bid');
			this.disabled = false;
		},
		onDown(event) {
			this.disabled = true;	
			if(this.value > 5 && this.value <= 150){
				if(this.value == 30)
					this.step = 5;			
				this.value -= this.step;
			}
			this.$emit('input', this.value);
			this.$emit('on_bid');
			this.disabled = false;		
		}
	}
}
</script>

<style lang="css">
</style>