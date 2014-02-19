---
layout: default
title: The Dog Gateway - About
active: About
---

# About #

The Dog Gateway was firstly developed in 2006, mainly with research purposes. It was targeted at a single home automation technology and had the goal of showing that advanced interaction with home environments was possible. This first version was named BCF, from the italian words for "it just works" (Basta Che Funzioni), to further highlight its transient nature.

From 2007 to 2014, the Dog Gateway has been developed and improved embedding more features, integrating new home, building and industrial automation technologies, providing a single uniform device abstraction layer based on Semantic Web technologies (the DogOnt ontology). In these years, 3 major versions have been released, the 3.0 being the latest.

Nowadays the Dog Gateway is an OSGi compliant implementation of smart environment gateway and IoT platform featuring multi-protocol capabilities, REST-based application APIs, Uniform device representation, Rule-based activations, Realtime data elaboration (with complex event processing technologies), Xively integration (to enable social sharing of consumptions and activations), etc.

The Dog Gateway development team is striving to improve and enrich the gateway day by day, and as result of this effort, several new features are currently on the way such as: integration of EnOcean devices, Philips Hue interoperability, Android example apps, etc.

We are actively involved in some European and International standardization activities in the smart energy metering field, and we aim at readily support and integrate the upcoming OSGi device abstraction specification. We are seeking volounteers to contribute to the project in order to boost its adoption in commercial products, research projects and DIY solutions.

# Who are we? #

We are a team of developers working as postdoc researchers at the [Politecnico di Torino](http://www.polito.it). We carry design and development activities in our spare time and, when possible during normal working hours (if the designed/developed feature is part of a research project). Currently our team includes:

---

### Active members ###

<div class="row">
{% for member in site.data.members %}
  <div class="col-md-6">
  	<img src="{{member.image}}" class="img-circle pull-left"/>
    <strong> {{ member.name }} </strong>
    <br/>
    {{ member.description }}
    </a>
  </div>
{% endfor %}
</div>

---

### Advisors ###

<div class="row">
{% for member in site.data.advisors %}
  <div class="col-md-6">
  	<img src="{{member.image}}" class="img-circle pull-left"/>
    <strong> {{ member.name }} </strong>
    <br/>
    {{ member.description }}
    </a>
  </div>
{% endfor %}
</div>

---

### Contributors ###

<div class="row">
{% for member in site.data.collaborators %}
  <div class="col-md-3 profile">
  	<img src="{{member.image}}" class="img-circle small"/><br/>
    <strong> {{ member.name }} </strong>
    <br/>
    {{ member.description }}
    </a>
  </div>
{% endfor %}
</div>

---

### Former members ###

<div class="row">
{% for member in site.data.former-members %}
  <div class="col-md-3 profile">
  	<img src="{{member.image}}" class="img-circle small"/><br/>
    <strong> {{ member.name }} </strong>
    <br/>
    {{ member.description }}
    </a>
  </div>
{% endfor %}
</div>

---

### Former contributors ###

<div class="row">
{% for member in site.data.former-contributors %}
  <div class="col-md-3 profile">
  <img src="{{member.image}}" class="img-circle small"/><br/>
    <strong> {{ member.name }} </strong>
    <br/>
    {{ member.description }}
    </a>
  </div>
{% endfor %}
</div>