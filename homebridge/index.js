"use strict";

let Service, Characteristic;
const axios = require("axios");

module.exports = (homebridge) => {
  Service = homebridge.hap.Service;
  Characteristic = homebridge.hap.Characteristic;
  homebridge.registerAccessory("出勤", "出勤", 出勤);
  homebridge.registerAccessory("退勤", "退勤", 退勤);
}

function 出勤(log, config){
  this.log = log;
  this.name = config.name;

  this._service = new Service.Switch(this.name);
  this._service.getCharacteristic(Characteristic.On)
    .on('set', this._setOn.bind(this));
}

出勤.prototype = {
  getServices(){
    return [this._service];
  },

  _setOn(on, callback){
    this.log("出勤");
    if (on) {
        setTimeout(function() {
          this._service.setCharacteristic(Characteristic.On, false);
        }.bind(this), 1000);
        axios.post("http://localhost:3000/syukkin")
        .then(()=>{callback();return})
        .catch(()=>{callback();return})
      }
      callback();
  }
};

function 退勤(log, config){
  this.log = log;
  this.name = config.name;

  this._service = new Service.Switch(this.name);
  this._service.getCharacteristic(Characteristic.On)
    .on('set', this._setOn.bind(this));
}

退勤.prototype = {
  getServices(){
  return [this._service];
},

_setOn(on, callback){
    this.log("退勤");
    if (on) {
      setTimeout(function() {
        this._service.setCharacteristic(Characteristic.On, false);
      }.bind(this), 1000);
      axios.post("http://localhost:3000/taikin")
      .then(()=>{callback();return})
      .catch(()=>{callback();return})
    }
    callback();
  }
};
