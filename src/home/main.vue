<template>
    <div class="row">
        <div class="col-md-2">
            <nav class="navbar navbar-light navbar-expand-sm px-0 flex-row flex-nowrap">
                <ul class="sidebar-nav">
                    <router-link tag="li" to="/home"><a>Home</a></router-link>
                    <router-link tag="li" to="/player_list"><a>Player List</a></router-link>
                    <router-link tag="li" to="/fixtures"><a>Match Fixtures</a></router-link>
                    <router-link tag="li" to="/results"><a>Results</a></router-link>
                </ul>
            </nav>
        </div>
        <div class="col-md-10">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
  export default {
    created() {
      this.$store.dispatch('websocket_load_action');
			this.$store.dispatch('data_load_action');
    }
  };
</script>

<style>
/* Sidebar Styles */

.sidebar-nav {
  list-style: none;
}

.sidebar-nav li {  
  line-height: 40px;  
}

.sidebar-nav li a {
  display: block;
  text-decoration: none;
  color: #000000;
  padding: 0px 10px;
}

.sidebar-nav li.active a,
.sidebar-nav li.active a:hover {
  background: #47adea;
  color: white;
}

.sidebar-nav li a:hover {
  text-decoration: none;
  color: blue;
  background: rgba(255, 255, 255, 0.2);
  border-bottom: 1px solid black;
}

.sidebar-nav li a:active, .sidebar-nav li a:focus {
  text-decoration: none;
}

.sidebar-nav>.sidebar-brand {
  height: 65px;
  font-size: 18px;
  line-height: 60px;
}

.sidebar-nav>.sidebar-brand a {
  color: #999999;
}

.sidebar-nav>.sidebar-brand a:hover {
  color: #fff;
  background: none;  
}

@media(min-width:768px) {
  #wrapper {
    padding-left: 0;
  }
  #wrapper.toggled {
    padding-left: 250px;
  }
  #sidebar-wrapper {
    width: 0;
  }
  #wrapper.toggled #sidebar-wrapper {
    width: 250px;
  }
  #page-content-wrapper {
    padding: 20px;
    position: relative;
  }
  #wrapper.toggled #page-content-wrapper {
    position: relative;
    margin-right: 0;
  }
}
</style>