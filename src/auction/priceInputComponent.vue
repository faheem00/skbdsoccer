<template>
	<div class="input-group">
		<div class="input-group-prepend">
			<button class="btn btn-info" type="button" @click="onDown" :disabled="disabled">-</button>
		</div>
		<input type="text" readonly :value="value" class="form-control">
		<div class="input-group-append">
			<button class="btn btn-info" type="button" @click="onUp" :disabled="disabled">+</button>
		</div>
	</div>	
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