'use strict';

function Project(opts) {
  this.name = opts.name;
  this.collaborator = opts.collaborator;
  this.version = opts.version;
  this.webaddress = opts.webaddress;
  this.category = opts.category;
  this.body = opts.body;
  this.publishedOn = opts.publishedOn; //changed to be consistent with labs//
}

Project.all = [];

Project.prototype.toHtml = function () {
  let template = Handlebars.compile($('#project-template').text());

  this.daysAgo = parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000); //date objects are so cool//
  this.publishStatus = this.publishedOn ? `Created ${this.daysAgo} days ago` : '(draft)';

  this.cooperationWith = this.collaborator ? ` in cooperation with ${this.collaborator}.` : `.`;
  this.body = marked(this.body);
  return template(this);
};

Project.loadAll = function(rawData) {
  rawData.sort(function(a,b) {
    return(new Date (b.publishedOn)) - (new Date(a.publishedOn));
  });
  rawData.forEach(function(ele) {
    Project.all.push(new Project(ele));
  });
};

Project.fetchAll = function() {
  if (localstorage.rawData) {
    Project.loadAll(JSON.parse(localstorage.rawData));
    projectView.initIndexPage();
  } else {
    $.getJSON('data/projects.json')
    .then(function(rawData) {
      Project.loadAll(rawData);
      localstorage.rawData = JSON.stringify(rawData);
      projectView.initIndexPage();
    }, function(err) {
      console.error(err);
    });
  }
};





// projects.forEach(function(a){
//   $('#projects').append(a.toHtml());
// });
