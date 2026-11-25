(function(){var I=window.CLF_I18N=window.CLF_I18N||{};var L=I.en=I.en||{};['q','course','lessons','glossary','services','domains','ui'].forEach(function(k){L[k]=L[k]||{};});
L.course["0-1"]={title:"Servers, data centers, and why the cloud exists",goals:["Understand what a server is and how it differs from your laptop","Know what a website needs in order to run 24/7","Understand what a data center is and what it costs to run your own servers","Grasp the core idea of the cloud: renting computing power over the internet"],html:`
<h3>What is a server? How is it different from your laptop?</h3>
<p>A <b>server</b> is really just a computer. It has a CPU (the processor), RAM (short-term working memory), a hard drive, and a network card, exactly like a laptop. What differs is its <i>purpose</i>: a laptop serves one person sitting in front of the screen, while a server serves many people at the same time, over a network.</p>
<p>Because it has to serve other people day and night, a server is usually designed to run nonstop for years without being turned off. It usually has no monitor or keyboard. The people who manage it control it remotely.</p>
<p>When you open Facebook, YouTube, or an online store, your phone is "asking" a server somewhere. The server receives the request, finds the data, and sends the web page back to you.</p>
<div class="box idea"><b>🧠 In plain terms</b><p>A laptop is like your home kitchen: it cooks for your family. A server is like a restaurant kitchen: it cooks for hundreds of customers, stays open from morning to night, and is not allowed to "call in sick". Both are kitchens, but the demands are completely different.</p></div>

<h3>What does a website need in order to run?</h3>
<p>For an online store to work, it needs at least the following:</p>
<ul>
<li><b>A computer to run the code</b>: the programs that handle orders, logins, and payments.</li>
<li><b>A place to store data</b>: the product list, the orders, the cake photos.</li>
<li><b>An internet connection</b> that is stable and fast enough for many visitors at once.</li>
<li><b>Uninterrupted power</b>: if the power goes out, the website "dies".</li>
<li><b>Someone to look after it</b>: updating software, fixing bugs, backing up data, keeping hackers out.</li>
</ul>
<p>For a small website, all of these can live inside a single computer. But as the business grows, everything gets far more complicated.</p>
<div class="box example"><b>🍰 Example: BanhNgon Bakery</b><p>When she first started selling online, Lan asked Minh to set up the website on an old computer in the shop's storeroom, next to the sacks of flour. On a normal day a few dozen customers visited, and the machine ran smoothly.</p><p>Then came the Tet (Lunar New Year) sale. Lan ran ads, and thousands of people visited at the same time. The computer was overloaded and the website froze. Worse, that afternoon the neighborhood lost power for two hours. Customers could not order their cakes and went to other shops. Minh spent the whole night restarting everything and checking whether any orders had been lost.</p></div>

<h3>The data center: a "hotel" for servers</h3>
<p>Large companies do not keep servers in a storeroom. They keep them in a <b>data center</b>: a purpose-built building that holds hundreds or thousands of servers stacked on metal frames called <b>racks</b>.</p>
<p>A proper data center must have:</p>
<ul>
<li>Backup power: generators and battery systems (UPS) so the power never goes out.</li>
<li>Cooling systems: servers that run nonstop give off a lot of heat, and they break if they get too hot.</li>
<li>Physical security: guards, cameras, access cards, fire protection, flood protection.</li>
<li>High-speed internet links, usually from several network providers for redundancy.</li>
<li>A team of engineers who replace failed drives, install new machines, and monitor everything 24/7.</li>
</ul>
<p>When a company buys its own servers and keeps them in its own data center (or in its office), this is called <b>on-premises</b> (on the company's own site, often shortened to "on-prem").</p>

<h3>The cost of running it yourself</h3>
<p>Running your own servers sounds like "being in control", but it comes with many problems:</p>
<ul>
<li><b>Upfront spending</b>: you have to buy the machines before you know whether the business will succeed. A good server can cost as much as a full year of shop rent.</li>
<li><b>Guessing capacity</b>: buy too little and you crash when it gets busy; buy too much and the machines sit idle most of the time.</li>
<li><b>Slow</b>: ordering, waiting for delivery, installing, and setting up can take weeks to months.</li>
<li><b>Hidden costs</b>: electricity, cooling, floor space, salaries for the operations staff, replacing machines every few years.</li>
<li><b>Risk</b>: fire, flood, power outages, failed drives, all of it is your problem.</li>
</ul>
<div class="box idea"><b>🧠 In plain terms</b><p>Running your own servers is like having to buy a car, rent a parking space, do the maintenance, and buy the insurance yourself just to get around. Even in a month when you barely drive, you still pay for all of it.</p></div>

<h3>The cloud idea: rent instead of buy</h3>
<p>Giant companies like Amazon had already built large numbers of data centers around the world. They thought: "Why not rent them out to other people?" That is exactly what <b>cloud computing</b> is.</p>
<p>With the cloud, you do not buy machines. You go to the provider's website, click a few buttons, and a few minutes later you have a "server" ready to use. You pay only for what you use, by the hour or even by the second. When you no longer need it, you turn it off and stop paying.</p>
<p>The word "cloud" is just a figure of speech: the servers are still real machines, sitting in real data centers. You simply do not see them, do not have to look after them, and you reach them over the internet.</p>
<div class="box idea"><b>🧠 In plain terms</b><p>The cloud is like using a ride-hailing app instead of buying a car. You call a ride when you need one and pay for the distance traveled. Maintenance, fuel, and parking are the company's job.</p></div>
<p><b>AWS</b> (Amazon Web Services) is Amazon's cloud provider, and it is also the subject of the exam you are studying for.</p>
<div class="box example"><b>🍰 Example: BanhNgon</b><p>After the disastrous Tet sale, Minh proposed moving the website to AWS. On normal days it runs on just one small, cheap machine. During the Tet season they turn on more machines to handle the customers, then turn them off when Tet is over. No more worrying about power cuts in the storeroom, because AWS data centers have backup power and their own staff looking after them. Lan pays only for what she actually uses.</p></div>
<div class="box exam"><b>🎯 What the exam asks</b><ul>
<li>"stop buying servers upfront", "pay only for what you use" → the benefit <b>Trade fixed expense for variable expense</b> (fixed costs become costs that follow your usage).</li>
<li>"buys too many servers for peaks, resources idle" → <b>Stop guessing capacity</b>.</li>
<li>"costs eliminated by moving from on-premises" → buying/replacing hardware, data center power and cooling.</li>
<li>The exam constantly compares <b>on-premises</b> with the <b>AWS Cloud</b>: remember the "pain points" above, because the answer is usually that the cloud solves them.</li>
</ul></div>
<div class="box trap"><b>⚠️ Common trap</b><p>Moving to the cloud does not mean "no more responsibility". AWS takes care of the data centers, power, and hardware; but your data, your user accounts, and your security configuration are still your job. You will study this in detail in the Shared Responsibility Model section.</p></div>
`,summary:["A server is a computer dedicated to serving many people over a network, running nonstop 24/7.","A website needs a machine to run code, a place to store data, internet, power, and people to operate it.","A data center is a building built to house servers, with backup power, cooling, and security.","Running it yourself (on-premises) means upfront spending, guessing capacity, slow setup, and many hidden costs.","Cloud = renting computing power over the internet, paying only for what you use, ready within minutes."],terms:[["Server","a computer that serves many users over a network"],["Data center","a building built to house and run servers"],["Rack","a metal frame that holds servers"],["On-premises (on-prem)","infrastructure a company owns and runs on its own site"],["Cloud computing","renting computing resources over the internet"],["CPU","the processor, the computer's \"brain\""],["RAM / memory","short-term working memory"],["Capacity","how much load a system can handle"],["Upfront cost","money paid before you start using something"],["Pay-as-you-go","pay only for what you actually use"]]};
L.course["0-2"]={title:"How the internet works: IP, DNS, networks, and latency",goals:["Understand the client/server model behind opening a web page","Know what an IP address, a domain name, and DNS are","Tell bandwidth apart from latency, and understand why distance matters","Understand public/private networks and firewalls at a conceptual level"],html:`
<h3>Client and server: who asks, who answers</h3>
<p>Almost everything on the internet follows one pattern: one side <b>asks</b>, the other side <b>answers</b>. The side that asks is called the <b>client</b>, usually a browser or a phone app. The side that answers is the <b>server</b>.</p>
<p>When you type a website address, the browser sends a <b>request</b> to the server. The server processes it and sends back a <b>response</b>: the web page, images, data.</p>
<div class="box idea"><b>🧠 In plain terms</b><p>The client is the customer placing an order, and the server is the kitchen. The customer does not need to know how the kitchen cooks; they just need to order the right dish and receive the food.</p></div>

<h3>IP address, domain name, and DNS</h3>
<p>Every computer on the internet has a numeric address called an <b>IP address</b>, for example <code>203.0.113.25</code>. To send a request to a server, the client must know that server's IP, just as you need the house number to send a letter.</p>
<p>But people cannot remember strings of numbers. So we use an easy-to-remember <b>domain name</b>, such as <code>banhngon.vn</code>. The system that translates domain names into IP addresses is called <b>DNS</b> (Domain Name System).</p>
<div class="box idea"><b>🧠 In plain terms</b><p>DNS is the internet's phone book. You remember the name "Lan", and the phone book looks up the phone number. You type "banhngon.vn", and DNS looks up the server's IP address.</p></div>
<div class="flow"><span>Type banhngon.vn</span><span>DNS looks up the IP</span><span>Request sent to the IP</span><span>Server returns the web page</span></div>
<p>On AWS, the DNS service is called <b>Amazon Route 53</b>. You will meet it many times in later lessons.</p>

<h3>Ports: which door for which job</h3>
<p>A server can run many services at the same time. To tell them apart, each service "listens" on its own <b>port</b>, which is just a number. A few familiar ports:</p>
<ul>
<li><b>80</b>: HTTP, unencrypted web traffic.</li>
<li><b>443</b>: HTTPS, encrypted web traffic (the padlock in your browser).</li>
<li><b>22</b>: SSH, used to manage Linux servers remotely.</li>
</ul>
<p>If the IP is the building's address, the port is the room number. You do not need to memorize them all yet; just understand the idea so you can learn about firewalls later.</p>

<h3>Bandwidth and latency: how wide the road is and how long it is</h3>
<p>These two concepts are very often confused:</p>
<ul>
<li><b>Bandwidth</b>: the amount of data that can be transferred in one second. It is like the <i>width</i> of a road: the more lanes it has, the more cars can travel at once.</li>
<li><b>Latency</b>: the time it takes a packet of data to travel from the client to the server and back. It is like the <i>length</i> of the trip: even on a wide road, a long distance still takes time.</li>
</ul>
<p>Latency depends heavily on <b>distance</b>. Signals travel through fiber-optic cable fast, but not instantly. If the server is in the US, a user in Hanoi will find it slower than a server in Singapore or right in Vietnam.</p>
<div class="box example"><b>🍰 Example: BanhNgon Bakery</b><p>When BanhNgon opened a branch in Japan, customers in Tokyo complained that the website loaded slowly. Minh checked: the server was in Singapore, quite far from Tokyo. There was plenty of bandwidth; the problem was latency. The solution is to place more resources close to Japan, or to use a service that keeps copies of the cake photos near the users (later you will learn that this is Amazon CloudFront).</p></div>
<table>
<tr><th>Concept</th><th>Meaning</th><th>Analogy</th></tr>
<tr><td>Bandwidth</td><td>How much data can be transferred per second</td><td>How many lanes the road has</td></tr>
<tr><td>Latency</td><td>How long data takes to go there and back</td><td>How long the trip is</td></tr>
<tr><td>Throughput</td><td>The amount of data actually transferred</td><td>How many cars actually get through</td></tr>
</table>

<h3>Public networks, private networks, and firewalls</h3>
<p>A <b>public network</b> is the internet: anyone can reach it. A <b>private network</b> is an internal network where only the machines inside can talk to each other, like the Wi-Fi network in an office.</p>
<p>The safety principle: expose to the internet only what customers <i>need</i> to see (the website), and hide the sensitive things (the database holding the orders) in a private network.</p>
<p>A <b>firewall</b> is a "gatekeeper" that checks traffic going in and out against rules: which IPs and ports are allowed, and what is blocked. For example: "Allow everyone in on port 443, but allow port 22 only from Minh's computer".</p>
<div class="box idea"><b>🧠 In plain terms</b><p>The bakery has a sales counter open to everyone (public) and a storeroom in the back that only staff may enter (private). The firewall is the security guard at the door, holding a list of who may go through which door.</p></div>
<div class="box example"><b>🍰 Example: BanhNgon</b><p>Minh redesigned the system: the web server sits in the part of the network that can receive visitors from the internet, with only port 443 open. The database holding order information sits in the private part of the network, with no direct path from the internet; only the web server is allowed to connect to it. An attacker who wants to read the database has to get through several layers of "doors" first.</p></div>
<p>On AWS, your private network is called <b>Amazon VPC</b> (Virtual Private Cloud), and firewalls come in two forms: the <b>security group</b> and the <b>network ACL</b>. You will study them in detail in Domains 2 and 3.</p>
<div class="box exam"><b>🎯 What the exam asks</b><ul>
<li>"Domain Name System (DNS) web service" → <b>Amazon Route 53</b>.</li>
<li>"reduce latency for users around the world", "cache content at edge locations" → <b>Amazon CloudFront</b>.</li>
<li>"choose a Region close to users" → to reduce <b>latency</b>.</li>
<li>"stateless firewall at the subnet level" → <b>Network ACL</b>; a firewall at the server (instance) level → <b>Security group</b>.</li>
<li>"private connection that does not go over the public internet" → <b>AWS Direct Connect</b>.</li>
</ul></div>
<div class="box trap"><b>⚠️ Common trap</b><p>When a question asks about "reducing latency", the answer usually involves <i>getting closer to the users</i> (choosing a nearby Region, edge locations, CloudFront), not "buying more bandwidth" or "using a more powerful server".</p></div>
`,summary:["The client sends a request and the server returns a response: that is how every web page works.","An IP address is a machine's numeric address; a domain name is the easy-to-remember name; DNS translates names into IPs (Route 53 on AWS).","Ports tell apart the services on one server: 80 (HTTP), 443 (HTTPS), 22 (SSH).","Bandwidth is how wide the road is, latency is the round-trip time; distance increases latency.","A private network hides sensitive resources; a firewall allows or blocks traffic according to rules."],terms:[["Client","the device or app that sends requests to a server"],["Request / Response","what the client asks for / what the server sends back"],["IP address","the numeric address of a machine on a network"],["Domain name","an easy-to-remember name for a website"],["DNS (Domain Name System)","the system that translates domain names into IP addresses"],["Port","a number that identifies a service on a server"],["Bandwidth","how much data can be transferred per second"],["Latency","the delay for data to travel there and back"],["Public network","a network anyone can reach, such as the internet"],["Private network","an internal network closed to outsiders"],["Firewall","a gatekeeper that allows or blocks network traffic by rules"],["Edge location","a site close to users that delivers content faster"]]};
L.course["0-3"]={title:"What a web application is made of: code, database, files",goals:["Tell apart the frontend and the backend of an application","Understand what a database is and how relational and NoSQL differ","Know why you need separate file storage, backups, and monitoring","Understand scaling and APIs at a conceptual level"],html:`
<h3>Frontend and backend</h3>
<p>A web application usually has two parts:</p>
<ul>
<li><b>Frontend</b> (the user interface): what users see and click on: the "Order cake" button, product photos, the shopping cart. It runs in the browser or in a phone app.</li>
<li><b>Backend</b> (the processing behind the scenes): it runs on the server. It checks logins, calculates totals, saves orders, and sends confirmation emails.</li>
</ul>
<div class="box idea"><b>🧠 In plain terms</b><p>The frontend is the sales counter and the glass display case of cakes. The backend is the kitchen and the bookkeeping in the back. Customers only see the counter, but without the kitchen there is nothing to sell.</p></div>

<h3>The database: where everything is remembered</h3>
<p>A <b>database</b> is where structured data is stored so it can be searched and updated quickly: customers, products, orders. There are two main kinds:</p>
<p>A <b>relational database</b> stores data in <b>tables</b>, like Excel, with fixed columns. The tables are linked to each other; for example, the "Orders" table points to the "Customers" table. You query it with the <b>SQL</b> language. Examples: MySQL, PostgreSQL.</p>
<p>A <b>NoSQL database</b> stores data more flexibly, with no fixed tables, usually as "key → value" pairs or documents. It is very fast and easy to scale for extremely high traffic, but it is not strong at queries that join many tables.</p>
<table>
<tr><th></th><th>Relational (SQL)</th><th>NoSQL</th></tr>
<tr><td>How it stores data</td><td>Tables, fixed columns</td><td>Flexible: key-value, document…</td></tr>
<tr><td>Strong at</td><td>Linked data, strict transactions (orders, accounting)</td><td>High speed, massive scale, structures that change often</td></tr>
<tr><td>On AWS</td><td>Amazon RDS, Amazon Aurora</td><td>Amazon DynamoDB</td></tr>
</table>
<div class="box example"><b>🍰 Example: BanhNgon Bakery</b><p>BanhNgon's orders must be absolutely accurate: who ordered, which cake, how much, and whether it has been paid. Minh stores these in a relational database. The temporary shopping carts of thousands of customers browsing during the Tet season, on the other hand, need very fast reads and writes, so Minh is considering NoSQL for them.</p></div>

<h3>Files, images, and backups</h3>
<p>Cake photos, promotional videos, and PDF invoices are <b>files</b>. Storing files directly in a database is usually inefficient. Instead, files go into a separate storage service, and the database only records "where this photo lives". On AWS, the most popular file storage is <b>Amazon S3</b>.</p>
<p>A <b>backup</b> is a copy of your data made so you can recover after an incident: a failed drive, an accidental deletion, a ransomware attack. A good backup must be <i>automatic</i>, <i>regular</i>, and stored <i>somewhere other than</i> the original data.</p>
<div class="box idea"><b>🧠 In plain terms</b><p>A backup is like taking a photo of your ledger every evening and sending it to a family member for safekeeping. If the ledger gets wet, you still have a copy.</p></div>

<h3>Scaling: growing when it gets busy</h3>
<p><b>Scaling</b> means increasing the system's capacity when there are more users. There are two ways:</p>
<ul>
<li><b>Scale up / vertical scaling</b> (a bigger machine): switch to a more powerful machine with more CPU and more RAM. Simple, but it has limits, and you usually have to shut the machine down to upgrade.</li>
<li><b>Scale out / horizontal scaling</b> (more machines): add more machines running side by side, sharing the work of serving customers. This is what the cloud does extremely well.</li>
</ul>
<p>In the other direction, when it is quiet you <b>scale in</b> (remove machines) or <b>scale down</b> (use a smaller machine) to save money.</p>
<div class="box example"><b>🍰 Example: BanhNgon</b><p>Tet brings 10 times the customers of a normal day. Instead of buying one expensive "super machine" (scale up), Minh runs 1 machine on normal days and automatically grows to 5 machines in the Tet season (scale out), with a load balancer in front to spread customers evenly across the machines.</p></div>

<h3>APIs: the doorway between pieces of software</h3>
<p>An <b>API</b> (Application Programming Interface) is a way for one piece of software to "talk" to another according to clear rules. For example, the cake-ordering app calls the backend's "create order" API, or the backend calls the payment gateway's API.</p>
<div class="box idea"><b>🧠 In plain terms</b><p>An API is like a restaurant menu: it lists the dishes you may order and how to order them. You do not walk into the kitchen; you just order from the menu and receive the result.</p></div>
<p>The important point for the exam: <b>every action on AWS is an API call</b>, whether you click in the web console or use the command line. That is why AWS has a service that records every API call (AWS CloudTrail), so you know who did what.</p>

<h3>Logs and monitoring: knowing whether the system is healthy or sick</h3>
<p>A <b>log</b> is a set of lines recording events: "10:05 customer A logged in", "10:06 database connection error". <b>Monitoring</b> means tracking numbers such as CPU, memory, and request counts, and raising an <b>alarm</b> when something is abnormal.</p>
<div class="box example"><b>🍰 Example: BanhNgon</b><p>Minh sets up alarms: if the server's CPU stays above 80% for 5 minutes straight, or if there are too many errors when saving orders, his phone gets a text message. When there is an incident, he opens the logs to see when the error started and what caused it.</p></div>
<p>Without monitoring, you only find out the system is broken when customers call to complain. With monitoring, you know ahead of time and can act early. On AWS, the main monitoring service is <b>Amazon CloudWatch</b>.</p>
<div class="box exam"><b>🎯 What the exam asks</b><ul>
<li>"relational database", "MySQL / PostgreSQL" → <b>Amazon RDS</b> or <b>Amazon Aurora</b>.</li>
<li>"NoSQL", "key-value", "single-digit millisecond" → <b>Amazon DynamoDB</b>.</li>
<li>"store images/files/objects" → <b>Amazon S3</b>.</li>
<li>"centrally manage backups" → <b>AWS Backup</b>.</li>
<li>"records API calls", "who did what and when" → <b>AWS CloudTrail</b>; "metrics, alarms, logs" → <b>Amazon CloudWatch</b>.</li>
<li>"create, publish, secure APIs" → <b>Amazon API Gateway</b>.</li>
</ul></div>
<div class="box trap"><b>⚠️ Common trap</b><p>CloudTrail and CloudWatch have similar names. Tip: Trail = the "trail" someone leaves behind (who did what, auditing); Watch = "keeping watch" (performance, CPU, alarms).</p></div>
`,summary:["The frontend is the interface users see; the backend is the processing that runs on the server.","A relational database stores data in tables and uses SQL (RDS, Aurora); NoSQL is flexible and extremely fast at large scale (DynamoDB).","Files and images belong in separate storage (S3); backups must be automatic, regular, and kept somewhere else.","Scale up = a more powerful machine; scale out = more machines. The cloud excels at scaling out/in.","An API is how software calls other software; every action on AWS is an API call.","Logs and monitoring help you catch incidents early (CloudWatch); CloudTrail records who did what."],terms:[["Frontend","the part of an app users see and interact with"],["Backend","the processing that runs on the server"],["Database","organized storage for structured data"],["Relational database","a database that stores data in linked tables"],["NoSQL","a flexible database that does not use fixed tables"],["Backup","a copy of data kept for recovery"],["Vertical scaling (scale up)","switching to a more powerful machine"],["Horizontal scaling (scale out)","adding more machines side by side"],["API","a defined way for software to talk to other software"],["Log","a record of events in a system"],["Monitoring","tracking a system's health and performance"],["Alarm","an alert raised when something is abnormal"]]};
L.course["0-4"]={title:"Getting to know AWS & how to read exam questions",goals:["Know what an AWS account, the AWS Management Console, and the Region selector are","Understand how to avoid surprise bills when you practice on your own","Be clear on the structure and scoring of the CLF-C02 exam","Have a strategy for reading exam questions and eliminating wrong answers"],html:`
<h3>AWS account and the Console</h3>
<p>To use AWS, you need an <b>AWS account</b>. The account is both the "container" for every resource you create and the unit of billing: every cost incurred in the account goes onto its bill.</p>
<p>The identity that creates the account, with the original email and password, is called the <b>root user</b>, and it has full access. Because it is so powerful, the rule is to turn on multi-factor authentication (MFA) for the root user and not use it for everyday work. You will study this in detail in Domain 2.</p>
<p>The easiest way to work with AWS is the <b>AWS Management Console</b> (a web dashboard): you sign in from a browser, find a service, and click buttons to create resources. There is also the command line (AWS CLI) and libraries for developers (SDKs), all of which call APIs behind the scenes.</p>

<h3>The Region selector, and services as Lego bricks</h3>
<p>AWS has data centers in many places around the world, grouped into <b>Regions</b> (geographic areas), for example Singapore, Tokyo, Frankfurt. In the top right corner of the Console there is a Region selector. Most resources you create will live in the Region that is currently selected.</p>
<div class="box trap"><b>⚠️ Common trap</b><p>Beginners often "lose" resources: they create a machine in Tokyo, open the Console the next day with Singapore selected, do not see it, and assume it was deleted, but the machine is still running and still being billed. Always look at the selected Region before you search for or create resources.</p></div>
<p>When choosing a Region for a real system, 4 factors are commonly mentioned:</p>
<ul>
<li><b>Compliance / data sovereignty</b> (legal rules about where data may live): does the law require the data to stay in a particular country or area? This factor is usually considered first.</li>
<li><b>Proximity</b> (closeness to users): the closer to your customers, the lower the latency.</li>
<li><b>Service availability</b>: not every Region has every service, especially new ones.</li>
<li><b>Pricing</b>: the price of the same service can differ between Regions.</li>
</ul>
<p>AWS has more than 200 services. Do not panic: think of each service as a <b>Lego</b> brick that does exactly one job. One service to run virtual machines, one to store files, one for databases, one for DNS… You snap the bricks together into an application. The exam mostly asks: "Which Lego brick do you use for this job?"</p>
<div class="box idea"><b>🧠 In plain terms</b><p>At the supermarket, you do not need to know every product. You just need to know where the vegetable section is and where the meat section is. Studying AWS for this exam is the same: knowing which service solves which need is enough.</p></div>

<h3>Practicing safely: Free Tier and cost alerts</h3>
<p>AWS has a <b>Free Tier</b> program for new accounts, but it has limits and conditions, and those conditions have changed over time. For accounts created on or after <b>July 15, 2025</b>, you choose a <b>Free plan</b> or a <b>Paid plan</b> at sign-up; both receive <b>100 USD in credits</b> and can earn <b>up to 100 USD</b> more by completing certain activities. The Free plan never charges you, but it lasts <b>at most 6 months</b> (or until the credits run out). For the details and how to avoid surprises, see hands-on lesson <b>5-1</b>. Read the official Free Tier page before you practice, and do not assume "everything is free".</p>
<p>A few rules to avoid a surprise bill:</p>
<ul>
<li>Set up a <b>cost alert</b> as soon as you create the account, for example an email when costs go over a small amount. AWS has the <b>AWS Budgets</b> service for this.</li>
<li>When you finish practicing, <b>delete the resources</b> (virtual machines, databases, disks). Just "stopping" them can sometimes still cost money for storage.</li>
<li>Check the Billing page regularly, and remember to check <i>all Regions</i>.</li>
</ul>
<div class="box example"><b>🍰 Example: BanhNgon Bakery</b><p>The first time he tried AWS, Minh created a database to learn with and then forgot about it. At the end of the month the bill was small but unwelcome. Since then, Minh immediately sets a budget that emails him when costs exceed the amount he chose, and he has made a habit of cleaning up after every practice session.</p></div>

<h3>Structure of the CLF-C02 exam</h3>
<table>
<tr><th>Item</th><th>Details</th></tr>
<tr><td>Number of questions</td><td>65 questions: 50 scored + 15 unscored (AWS uses them to try out new questions, and you cannot tell which ones they are)</td></tr>
<tr><td>Multiple choice</td><td>Choose 1 correct answer out of 4</td></tr>
<tr><td>Multiple response</td><td>Choose 2 or more correct answers out of 5 or more options (the question says "Choose TWO" or "Choose THREE")</td></tr>
<tr><td>Time</td><td>90 minutes</td></tr>
<tr><td>Score</td><td>Scaled score of 100–1000; 700 or above passes</td></tr>
<tr><td>Penalty for wrong answers?</td><td>No. A blank answer also counts as wrong, so <b>never leave a question blank</b></td></tr>
</table>
<p>The four domains and their weights: Cloud Concepts 24%, Security and Compliance 30%, Cloud Technology and Services 34%, Billing, Pricing, and Support 12%.</p>
<p>If English is not your native language, you can request <b>ESL +30</b>: 30 extra minutes on the exam. You must submit the request in your AWS Certification account <i>before</i> you schedule the exam; it then applies to the exams you schedule afterwards.</p>

<h3>A strategy for reading exam questions</h3>
<p>CLF-C02 questions are usually a short scenario followed by "Which AWS service…?". Follow these 4 steps:</p>
<ol>
<li><b>Read the final question first</b>: are they asking for a service, a benefit, or whose responsibility something is?</li>
<li><b>Underline the keywords</b> that decide the answer, especially the comparison words: <b>MOST cost-effective</b> (the cheapest that still meets the requirements), <b>LEAST operational overhead</b> (the least work to run, usually a managed/serverless service), <b>MOST secure</b>, <b>fastest</b>, <b>minimal changes</b>.</li>
<li><b>Eliminate</b> the clearly wrong answers: services that are unrelated, or that would work but violate a keyword (for example, installing it yourself on a virtual machine when the question asks for "least operational overhead").</li>
<li><b>Choose</b> among the remaining answers. If you are unsure, flag the question for review, but still pick an answer for now.</li>
</ol>
<p>On timing: 65 questions in 90 minutes means about 1 minute 20 seconds per question. Do not get stuck on one hard question; pick an answer for now, flag it, move on, and come back at the end. On this website, every question comes with an explanation: practice reading the question carefully and answering on your own first, and only look at the explanation once you have committed to an answer, because on exam day you will have only the question in front of you.</p>
<div class="box exam"><b>🎯 What the exam asks</b><ul>
<li>"MOST cost-effective" → choose the cheapest option that <i>still meets the requirements</i>, not the absolute cheapest.</li>
<li>"LEAST operational overhead" / "without managing servers" → prefer a <b>managed</b> or <b>serverless</b> service.</li>
<li>"Choose TWO" / "Choose THREE" → you must select the full number of answers; miss one or get one wrong and you lose the whole question.</li>
<li>"alert when costs exceed a threshold" → <b>AWS Budgets</b>.</li>
<li>"factors when choosing a Region" → <b>data sovereignty/compliance</b>, <b>proximity to customers (latency)</b>, service availability, pricing.</li>
</ul></div>
<div class="box trap"><b>⚠️ Common trap</b><p>The most "impressive" sounding answer is not necessarily correct. If the question asks for the cheapest approach, a solution with multiple Regions and many layers of protection is usually wrong because it is far too expensive for the requirement.</p></div>
`,summary:["An AWS account holds your resources and is the unit of billing; the root user has full access and must be protected with MFA.","The Console is the web interface; always check the selected Region. Choose a Region by: compliance/data sovereignty, proximity to users, service availability, pricing.","Each AWS service is like a Lego brick; the exam asks which service fits which need.","Set up cost alerts (AWS Budgets) and delete resources after practicing; the Free Tier has limits.","The exam has 65 questions (50 scored), 90 minutes, a 100–1000 score, 700 to pass, and no penalty for wrong answers.","Find the keywords (MOST cost-effective, LEAST operational overhead), eliminate, then choose; request ESL +30 before scheduling."],terms:[["AWS account","the container for your AWS resources and the unit of billing"],["Root user","the account owner identity with full access"],["AWS Management Console","the AWS web dashboard"],["Region","a geographic area where AWS has data centers"],["Free Tier","the AWS free trial program for new accounts"],["Budget / billing alarm","a spending limit / an alert when costs exceed it"],["Multiple choice","a question with one correct answer"],["Multiple response","a question with two or more correct answers"],["Scaled score","a score converted to a standard 100–1000 scale"],["Cost-effective","good value: meets the need at low cost"],["Operational overhead","the effort needed to run and maintain something"],["Managed service","a service that AWS operates for you"]]};
L.course["1-1"]={title:"What is cloud computing: IaaS, PaaS, SaaS, and deployment models",goals:["Define cloud computing in 3 ideas: on-demand, pay-as-you-go, over the internet","Tell IaaS, PaaS, and SaaS apart and know who manages which part","Tell the 3 deployment models apart: cloud, hybrid, on-premises","Spot the keywords in a question so you pick the right model"],html:`
<h3>Cloud computing in one sentence</h3>
<p><b>Cloud computing</b> is the delivery of IT resources (servers, storage, databases, software…) <b>on demand</b> over the <b>internet</b>, with <b>pay-as-you-go</b> pricing. Three phrases to remember:</p>
<ul>
<li><b>On-demand</b>: it is there the moment you need it, with no ordering and waiting.</li>
<li><b>Pay-as-you-go</b>: you pay for what you use, with no upfront payment and no mandatory long-term contract.</li>
<li><b>Over the internet</b>: you can access it from anywhere.</li>
</ul>
<div class="box idea"><b>🧠 In plain terms</b><p>It is like electricity: you do not build a power plant, you just plug in and the power is there, and at the end of the month you pay for the amount you used.</p></div>

<h3>Three service models: IaaS, PaaS, SaaS</h3>
<p>The cloud comes in several "levels of service". The higher you go, the more the provider takes care of and the less you do. Think about eating pizza:</p>
<ul>
<li><b>On-premises</b>: making pizza at home from A to Z: you buy the oven, the dough, the toppings, bake it yourself, and clean up yourself.</li>
<li><b>IaaS</b> (Infrastructure as a Service): renting a kitchen that already has an oven. You still knead the dough, choose the toppings, and bake.</li>
<li><b>PaaS</b> (Platform as a Service): ordering pizza delivered to your home. You only take care of the table, chairs, and drinks.</li>
<li><b>SaaS</b> (Software as a Service): eating at a restaurant. Everything is ready; you just eat.</li>
</ul>
<table>
<tr><th>Model</th><th>You manage</th><th>The provider manages</th><th>Example</th></tr>
<tr><td><b>IaaS</b></td><td>Operating system, software, applications, data</td><td>Hardware, networking, data centers, virtualization</td><td>Amazon EC2 (virtual machines)</td></tr>
<tr><td><b>PaaS</b></td><td>Application code and data</td><td>Also the operating system, runtime environment, and deployment</td><td>AWS Elastic Beanstalk</td></tr>
<tr><td><b>SaaS</b></td><td>Just using the software, configuring accounts, and the data you enter</td><td>Almost everything</td><td>Gmail, online CRM software</td></tr>
</table>
<div class="box example"><b>🍰 Example: BanhNgon Bakery</b><p>Minh has three options when moving the website to AWS:</p><p><b>IaaS</b>: rent an EC2 virtual machine and install the operating system and web server and apply security patches himself. The most flexible, but also the most work.</p><p><b>PaaS</b>: use Elastic Beanstalk and just upload the code; AWS takes care of the servers, load balancing, and scaling.</p><p><b>SaaS</b>: Lan uses online accounting software and business email: nobody in the shop has to install anything.</p></div>

<h3>Three deployment models: cloud, hybrid, on-premises</h3>
<p>Besides the "level of service", the exam also asks about the <b>deployment model</b>: <i>where</i> your system lives.</p>
<ul>
<li><b>Cloud</b> (also called cloud-native or all-in cloud): the entire application runs in the cloud. It may be an existing application that was migrated, or one built entirely new in the cloud.</li>
<li><b>Hybrid</b> (a mix): on-premises infrastructure combined with the cloud, with the two sides connected. Common when a company is migrating gradually, or has systems that must stay on site.</li>
<li><b>On-premises</b> (also called private cloud): resources run in the company's own data center, possibly using virtualization technology to get a cloud-like experience.</li>
</ul>
<table>
<tr><th>Model</th><th>Where the resources live</th><th>Keywords in the question</th></tr>
<tr><td>Cloud</td><td>Entirely on AWS</td><td>"all parts of the application run in the cloud"</td></tr>
<tr><td>Hybrid</td><td>Partly on site, partly in the cloud, connected</td><td>"connect on-premises infrastructure with cloud resources"</td></tr>
<tr><td>On-premises / private cloud</td><td>The company's own data center</td><td>"own data center", "virtualization"</td></tr>
</table>
<div class="box example"><b>🍰 Example: BanhNgon</b><p>During the transition, the new website runs on AWS, but the cash register computer at the counter and the old inventory software are still in the shop. The two sides are connected to keep orders in sync. That is the <b>hybrid</b> model. A year later, when inventory also moves to the cloud, BanhNgon becomes a <b>cloud</b> model.</p></div>

<h3>Which model to choose: trading control for effort</h3>
<p>No model is "the best" in every case. The question to ask is: how much <b>control</b> do you want, and how much <b>operational effort</b> are you willing to put in?</p>
<ul>
<li>You need to install special software, tune the operating system deeply, or move an old server up as it is: choose <b>IaaS</b>.</li>
<li>You have a small team that just wants to focus on writing code and not worry about patching servers: choose <b>PaaS</b> or managed services.</li>
<li>You have a common need (email, accounting, customer management) that ready-made software already covers: choose <b>SaaS</b> and skip building it yourself.</li>
</ul>
<p>In practice, a company usually uses <i>all three</i> at once for different needs. What matters is understanding the boundary of responsibility: which part you take care of and which part the provider takes care of. This idea comes back in the <b>Shared Responsibility Model</b> lesson in Domain 2: the more managed a service is, the more of the work AWS carries.</p>
<div class="box idea"><b>🧠 In plain terms</b><p>Renting a place to live works the same way. Building a house on your own land is on-premises. Renting an <b>empty apartment</b>: the walls, power, and water are there, and you buy the furniture and arrange it yourself (IaaS). Renting a <b>furnished apartment</b>: you just show up with a suitcase (PaaS). Staying in a <b>hotel</b>: someone cleans the room and cooks, and you just use it (SaaS). As with the pizza above: the more convenient it is, the less freedom you have to change things.</p></div>

<h3>How the exam asks</h3>
<div class="box exam"><b>🎯 What the exam asks</b><ul>
<li>"on-demand delivery of IT resources over the internet with pay-as-you-go pricing" → the definition of <b>cloud computing</b>.</li>
<li>"example of IaaS" / "full control over the operating system" → <b>Amazon EC2</b>.</li>
<li>"upload code and AWS handles deployment, capacity, load balancing" → <b>AWS Elastic Beanstalk</b> (PaaS).</li>
<li>"complete product run and managed by the provider" → <b>SaaS</b>.</li>
<li>"connects on-premises infrastructure with the cloud" → <b>Hybrid</b> deployment.</li>
</ul></div>
<div class="box trap"><b>⚠️ Common trap</b><p>"Hybrid" is a <i>deployment</i> model (where), while IaaS/PaaS/SaaS are <i>service</i> models (how much you manage). Do not mix the two groups. One more point: with IaaS, you still have to patch the operating system yourself; that is why EC2 is classified as IaaS.</p></div>
`,summary:["Cloud computing = IT resources on demand, over the internet, with pay-as-you-go pricing.","IaaS: rent the infrastructure and handle the OS and everything above it (EC2). PaaS: handle only the code (Elastic Beanstalk). SaaS: use finished software.","The further you go from IaaS to SaaS, the more the provider handles and the less control you have.","Deployment models: cloud (everything in the cloud), hybrid (on-prem connected to the cloud), on-premises/private cloud.","Do not confuse service models with deployment models."],terms:[["Cloud computing","on-demand IT resources delivered over the internet"],["On-demand","available the moment you need it"],["Pay-as-you-go","pay only for what you use"],["IaaS (Infrastructure as a Service)","renting raw infrastructure such as servers and networking"],["PaaS (Platform as a Service)","a platform that runs your code for you"],["SaaS (Software as a Service)","finished software you simply use"],["Deployment model","where your system runs"],["Hybrid","a mix of on-premises and cloud, connected"],["Private cloud","cloud-like resources in a company's own data center"],["Virtualization","running many virtual machines on one physical machine"],["Virtual machine","a software-based computer running on shared hardware"]]};
L.course["1-2"]={title:"The 6 advantages of the AWS Cloud, plus HA, elasticity, and agility",goals:["Memorize and understand the six advantages of the cloud, with examples","Tell scalability apart from elasticity","Tell high availability, fault tolerance, and durability apart","Understand what agility means on the exam"],html:`
<h3>The six advantages of the cloud</h3>
<p>AWS sums up the benefits of the cloud in 6 phrases. The exam often uses these phrases <i>word for word</i> as answer options, so memorize the exact wording.</p>
<p><b>1. Trade fixed expense for variable expense</b> (swap fixed costs for costs that follow your usage). You do not have to pay for data centers and servers before you know how much you will use. You pay only when you use something, and using less means paying less.</p>
<p><b>2. Benefit from massive economies of scale</b> (gain from AWS's enormous size). AWS serves a huge number of customers and buys hardware in extremely large quantities, so its cost per unit is low and pay-as-you-go prices are lower than what a single company could achieve on its own.</p>
<p><b>3. Stop guessing capacity</b> (no more predicting how much you need). You do not need to guess in advance how many machines you need. Scale up when it is busy and down when it is quiet, within minutes.</p>
<p><b>4. Increase speed and agility</b> (move faster and adapt more easily). New resources are available in minutes instead of weeks, so teams experiment quickly and ship products quickly.</p>
<p><b>5. Stop spending money running and maintaining data centers</b> (no more paying to operate data centers). No more racking servers, plugging in power, and cooling; you focus on your customers and your product.</p>
<p><b>6. Go global in minutes</b> (reach the whole world in minutes). You can deploy an application to many Regions around the world with just a few steps, giving faraway customers low latency.</p>
<div class="box example"><b>🍰 Example: BanhNgon Bakery</b><p>The six advantages through the BanhNgon story:</p><ul>
<li>No more buying a 50 million VND machine; they pay a few hundred thousand VND a month based on usage (1).</li>
<li>The rental price is low because AWS buys machines in bulk (2).</li>
<li>Machines are added automatically in the Tet season and removed again afterwards (3).</li>
<li>Minh tries out a "custom birthday cake order" feature in one afternoon, and deletes it if it does not work out (4).</li>
<li>No more babysitting a machine in the storeroom (5).</li>
<li>When they open in Japan, they launch another copy of the system in the Tokyo Region in minutes (6).</li>
</ul></div>

<h3>Scalability and elasticity</h3>
<p><b>Scalability</b> means the system <i>can</i> grow to meet increasing demand by adding resources. It is a capability, and it can be done manually or according to a plan.</p>
<p><b>Elasticity</b> means the system <i>automatically</i> adds resources when demand rises and <i>automatically removes</i> them when demand falls, closely tracking actual demand so nothing is wasted.</p>
<div class="box idea"><b>🧠 In plain terms</b><p>Scalability is like a restaurant that can set out more tables when needed. Elasticity is like pants with an elastic waistband: they stretch when your belly is bigger and shrink back when it is smaller, automatically, with nobody adjusting anything.</p></div>
<p>On AWS, elasticity is usually achieved with <b>Amazon EC2 Auto Scaling</b>: it automatically adds or removes machines based on load.</p>

<h3>High availability, fault tolerance, and durability</h3>
<p><b>High availability</b> means the system is almost always up, with very little downtime. The common approach: run in multiple <b>Availability Zones</b> (AZs, separate clusters of data centers within one Region). If one AZ has a problem, another AZ keeps serving.</p>
<p>Why do multiple AZs give you high availability? Because each AZ has <b>independent power, cooling, and networking</b>, and they are placed far enough apart that a fire or power outage does not affect two of them, yet close enough that the connections between them have low latency. On a larger scale, <b>Regions</b> are located in different geographic areas and are <b>isolated from each other</b>.</p>
<ul>
<li>Data you store in one Region is <b>not automatically replicated</b> to another Region. If you want a copy in another Region, you have to turn on replication yourself.</li>
<li>Need <b>disaster recovery</b> (getting back up after a major disaster) at a site hundreds of kilometers away? You do not need to build a second data center: just set up resources in another Region, on demand and pay-as-you-go.</li>
</ul>
<p><b>Fault tolerance</b> is a higher level: the system keeps running <i>normally</i> even when a component fails, and users barely notice. Achieving this requires redundancy in every important component.</p>
<p><b>Durability</b> means data is <i>not lost</i> over time. For example, Amazon S3 is designed for 99.999999999% durability (11 nines) for stored data. Note: durable is not the same as available. Data can be temporarily unreachable and still not be lost.</p>
<table>
<tr><th>Concept</th><th>The question it answers</th><th>Bakery analogy</th></tr>
<tr><td>High availability</td><td>Is the system always open for business?</td><td>There are 2 branches: if one is closed, customers go to the other</td></tr>
<tr><td>Fault tolerance</td><td>If one part fails, does it keep running as if nothing happened?</td><td>There are 2 ovens running side by side; if 1 breaks, enough cakes still come out</td></tr>
<tr><td>Durability</td><td>Can the data be lost?</td><td>The cake recipes are kept in a safe, with several copies</td></tr>
<tr><td>Elasticity</td><td>Does it grow/shrink automatically with demand?</td><td>Extra bakers are called in automatically for Tet and sent home when it is quiet</td></tr>
</table>

<h3>Agility: fast and willing to try</h3>
<p><b>Agility</b> in the cloud means cutting the time and cost of getting new resources, so a business can <b>experiment more</b>, <b>fail more cheaply</b>, and <b>get to market faster</b>. If an experiment fails, you just delete the resources; you are not "stuck" with equipment you already bought.</p>
<div class="box example"><b>🍰 Example: BanhNgon</b><p>Minh wants to try a chatbot that recommends cakes. In the old days that meant buying a new machine and losing a whole month. On AWS, he spins it up in a day and lets 100 customers try it for a week. If customers like it, he keeps it; if they do not, he deletes it and has lost only pocket change.</p></div>

<h3>How the exam asks</h3>
<div class="box exam"><b>🎯 What the exam asks</b><ul>
<li>"pay only for what you consume", "no upfront investment" → <b>Trade fixed expense for variable expense</b>.</li>
<li>"aggregated usage from many customers → lower prices" → <b>Benefit from massive economies of scale</b>.</li>
<li>"over-provisioning", "idle resources", "capacity planning" → <b>Stop guessing capacity</b>.</li>
<li>"deploy in multiple Regions around the world quickly" → <b>Go global in minutes</b>.</li>
<li>"experiment quickly", "reduce time to market" → <b>Increase speed and agility</b>.</li>
<li>"automatically acquire and release resources as demand changes" → <b>Elasticity</b>.</li>
<li>"multiple Availability Zones, keeps running if one AZ fails" → <b>High availability</b>; the reason: each AZ has <b>independent power, cooling, and networking</b>.</li>
<li>"keep adding capacity as the business grows, without redesign" (growing steadily over time, with no mention of shrinking) → <b>Scalability</b>; "grow and shrink automatically during a short sale" → <b>Elasticity</b>.</li>
<li>"metric that shows agility" → the time to get a new environment drops from <i>weeks to minutes</i>.</li>
<li>"engineers spend time replacing disks, cooling, data center leases" → <b>Stop spending money running and maintaining data centers</b>.</li>
</ul></div>
<div class="box trap"><b>⚠️ Common trap</b><p>Elasticity always implies "both up and down, automatically". If the question only says "can grow", it is scalability. And do not confuse durability (data is not lost) with availability (you can reach it when you need it).</p><p>The exam also likes to plant wrong answers such as "Customer responsibility for physical security" or "requirement to purchase hardware upfront": those are characteristics of on-premises, not benefits of the cloud.</p><p>Another "NOT a benefit" pattern: "AWS takes full responsibility for configuring who can access the company's data" is <b>wrong</b>. AWS takes care of the infrastructure; access to the data is still configured by the customer. Likewise, "data is automatically replicated to another Region" is also wrong.</p></div>
`,summary:["The 6 advantages: fixed → variable expense; economies of scale; stop guessing capacity; speed & agility; stop running data centers; go global in minutes.","Scalability = able to grow; elasticity = automatically grows and shrinks with demand.","High availability = little downtime, usually by using multiple AZs (each AZ has independent power, cooling, and networking); fault tolerance = keeps running normally when a part fails.","Regions are isolated from each other; data is not automatically replicated to another Region. Faraway DR = setting up resources in another Region on demand.","Durability = data is not lost (S3: 11 nines), which is different from availability.","Agility = resources available fast, cheap experiments, faster time to market."],terms:[["Variable expense","a cost that goes up and down with usage"],["Economies of scale","lower cost per unit thanks to large size"],["Capacity planning","estimating how many resources you will need"],["Agility","the ability to move and adapt quickly"],["Scalability","the ability to grow to meet demand"],["Elasticity","automatically growing and shrinking with demand"],["High availability","the system is almost always up"],["Fault tolerance","keeps running normally when a component fails"],["Durability","data is not lost over time"],["Downtime","time when a system is not working"],["Availability Zone (AZ)","a separate cluster of data centers within a Region"],["Redundancy","spare duplicates that take over on failure"],["Disaster recovery (DR)","getting systems back after a major disaster"],["Time to market","how long it takes to launch a product"]]};
L.course["1-3"]={title:"Cloud economics: CapEx/OpEx, TCO, BYOL, rightsizing",goals:["Tell fixed costs from variable costs, and CapEx from OpEx","List the hidden costs of on-premises and understand the idea of TCO","Tell BYOL from license-included","Understand rightsizing and why automation saves money"],html:`
<h3>Fixed costs and variable costs</h3>
<p>A <b>fixed cost</b> is something you pay no matter how much or how little you use, such as buying machines or renting floor space. A <b>variable cost</b> changes with usage, such as an electricity bill or a taxi fare.</p>
<p>On-premises is mostly fixed cost: once you have bought the machines, they still sit there in a slow month. The cloud turns most of that into variable cost: in a slow month, the bill is low.</p>
<p>Examples of variable costs on AWS: Amazon S3 charges by the number of GB stored each month; EC2 On-Demand charges by the second of use. Buying servers or signing a multi-year data center lease are fixed costs.</p>

<h3>CapEx and OpEx</h3>
<p><b>CapEx</b> (Capital Expenditure) is money spent once, upfront, to buy assets you use for a long time: servers, network equipment, building a data center. <b>OpEx</b> (Operational Expenditure) is money paid regularly to use a service: your monthly AWS bill.</p>
<div class="box idea"><b>🧠 In plain terms</b><p>Buying a truck to deliver cakes is CapEx. Paying a delivery service per trip is OpEx. The cloud lets you move from "buying the truck" to "paying per trip".</p></div>
<div class="box example"><b>🍰 Example: BanhNgon Bakery</b><p>In the first year, Lan had to spend a large sum on a server, a backup power unit, and air conditioning for the storeroom (CapEx). On AWS, she pays no large sum upfront; the cost becomes a monthly bill (OpEx) that goes up and down with the number of customers. She uses the money she saves to run ads.</p></div>

<h3>Hidden costs of on-premises, and TCO</h3>
<p>When comparing on-prem with the cloud, many people only compare "the price of a server" with "the price of renting a virtual machine". That comparison is wrong, because on-prem has many hidden costs:</p>
<ul>
<li>Power for the servers and <b>cooling</b>.</li>
<li>Rented space, racks, physical security, fire protection.</li>
<li>Salaries for operations staff, night shifts, replacing failed hard drives.</li>
<li>Network equipment, network links, spare capacity.</li>
<li><b>Hardware refresh</b>: after a few years you must replace the machines with new ones.</li>
<li>Extra machines bought to cover peak times that sit idle most of the time.</li>
</ul>
<p><b>TCO</b> (Total Cost of Ownership) is the sum of <i>all</i> direct and indirect costs of owning and operating a system over its whole lifetime. When you calculate the full TCO, the cloud usually looks much better than when you only look at the machine price.</p>
<div class="box example"><b>🍰 Example: BanhNgon</b><p>Minh tries calculating TCO over 3 years. On the on-prem side: buying 2 servers (one as a spare), a backup power unit, air conditioning running day and night, electricity, part of Minh's own salary for looking after the machines, and replacing the machines in year 3. On the AWS side: a monthly bill estimated from actual usage, plus the time Minh spends managing the account. Once everything is added up, the gap is much bigger than when you only compare "the server price" with "the virtual machine rental price".</p></div>
<p>Note: TCO is not only about money. Staff time, the risk of an outage, and how fast you can launch new products are also "costs" to take into account.</p>
<h4>Which costs go down, and which remain?</h4>
<table>
<tr><th>Reduced or eliminated by moving to AWS</th><th>Still there (the customer handles it)</th></tr>
<tr><td>Buying and replacing servers and network equipment</td><td>Time spent patching the operating system inside EC2 (the guest OS)</td></tr>
<tr><td>Data center power, cooling, floor space, physical security</td><td>Licenses for commercial software you install on the machines</td></tr>
<tr><td>Extra machines sitting idle</td><td>Configuring applications, managing data and access permissions</td></tr>
<tr><td>Labor for replacing hard drives and installing racks</td><td>Developer time spent writing new features for the business</td></tr>
</table>
<p>With managed services (such as Amazon RDS), AWS also takes on patching the database engine and automated backups. But the effort of writing business features stays about the same wherever you run.</p>
<div class="box idea"><b>🧠 In plain terms: why the hourly price is "higher" but the total is still lower</b><p>Divide the price of a server you buy by the number of hours in 3 years, and it may even be lower than the hourly price of EC2. But if that server runs at only 15% of its capacity on average, you are paying for 85% that sits idle. On AWS, capacity follows actual usage, so the total cost is lower. It is like a taxi: more expensive per kilometer, but cheaper than keeping a car that sits in the garage all week.</p></div>
<p>To estimate your AWS costs before you move, there is the <b>AWS Pricing Calculator</b>. To build a business case based on data from your current systems, there is <b>Migration Evaluator</b> (you will meet it in the migration lesson).</p>

<h3>Economies of scale: why AWS is cheap</h3>
<p>AWS buys hardware, power, and bandwidth in enormous quantities and operates very efficiently. The cost per unit goes down, and AWS passes part of that benefit on to customers through lower prices. A small bakery could never negotiate prices like that.</p>

<h3>BYOL and license-included</h3>
<p>A lot of commercial software (such as Microsoft Windows Server, SQL Server, Oracle) requires a <b>license</b> (paid permission to use the software). On AWS there are two ways to handle this:</p>
<ul>
<li><b>License-included</b>: the rental price already includes the license fee. Simple, nothing to buy separately.</li>
<li><b>BYOL</b> (Bring Your Own License): a company that already bought licenses brings them to AWS and keeps using them, without paying for the license again, which saves money. Some licenses counted per physical socket/core require a dedicated physical server such as <b>EC2 Dedicated Hosts</b>.</li>
</ul>
<p>BYOL can save money, but you must comply with the software vendor's terms.</p>
<table>
<tr><th>Situation</th><th>What to choose</th></tr>
<tr><td>No license yet, and you do not want to buy or track licenses yourself (for example Amazon RDS for SQL Server)</td><td><b>License Included</b>: the license fee is part of the hourly price</td></tr>
<tr><td>You already have licenses and want to reuse them</td><td><b>BYOL</b></td></tr>
<tr><td>Licenses counted per physical socket/core, where you need visibility of the physical server and need to keep instances on the same host long term</td><td><b>EC2 Dedicated Hosts</b></td></tr>
<tr><td>You want third-party software (a firewall, security software…), billed by the hour on your AWS bill, without negotiating a contract with the vendor yourself</td><td><b>AWS Marketplace</b> (a catalog of ready-to-buy software, some of it priced pay-as-you-go)</td></tr>
<tr><td>Track how many licenses are in use and block running more than you have bought</td><td><b>AWS License Manager</b></td></tr>
</table>

<h3>Rightsizing and automation</h3>
<p><b>Rightsizing</b> means adjusting resources to match actual need. If a server uses only 10% of its CPU, switch to a smaller, cheaper type. In the cloud this is easy, because changing the instance type takes only a few minutes and can be done at any time, so capacity closely follows actual usage. On-prem, a machine you have already bought cannot be "shrunk".</p>
<p>Before you change anything, get evidence: usage figures (CPU, memory…) from <b>Amazon CloudWatch</b> and sizing suggestions from <b>AWS Compute Optimizer</b> (a service that uses machine learning to analyze usage and recommend a better-fitting instance type).</p>
<div class="box example"><b>🍰 Example: BanhNgon</b><p>Looking at the monitoring charts, Minh sees that the website server uses only about 8% of its CPU on a normal day. He moves to a smaller instance type, and the bill drops by almost half while customers notice no difference. That is rightsizing.</p></div>
<p><b>Automation</b> also saves money: automatically shutting down test machines outside working hours, scaling automatically with load, building infrastructure with code instead of clicking by hand. Less manual work means fewer mistakes, fewer labor hours, and no forgotten resources left running idle.</p>
<div class="box exam"><b>🎯 What the exam asks</b><ul>
<li>"costs eliminated by moving to AWS" → <b>buying/replacing hardware</b>, <b>data center power and cooling</b>. (Securing customer data and designing the application are still your job.)</li>
<li>"use existing licenses on AWS" → <b>BYOL</b>; licenses per socket/core → <b>Dedicated Hosts</b>.</li>
<li>"instances use less than 10% CPU, change to smaller types" → <b>Rightsizing</b>.</li>
<li>"rightsizing evidence before changing instance types" → <b>CloudWatch</b> (metrics) + <b>AWS Compute Optimizer</b> (recommendations).</li>
<li>"how does automation reduce costs" → less manual work, fewer errors, turning resources off and on as needed. "Dev/test is only used during business hours" → <b>automatically stop instances outside working hours</b>.</li>
<li>"no license, do not want to track licenses" → <b>License Included</b>; "third-party software billed by the hour on AWS bill" → <b>AWS Marketplace</b>; "track license usage, prevent exceeding owned licenses" → <b>AWS License Manager</b>.</li>
<li>"which costs remain after rehosting to EC2" → patching the guest OS, software licenses, application configuration.</li>
<li>"estimate monthly cost before migrating" → <b>AWS Pricing Calculator</b>.</li>
</ul></div>
<div class="box trap"><b>⚠️ Common trap</b><p>Moving to the cloud does <i>not</i> eliminate all license costs: if you use commercial software you still pay, either through license-included or BYOL. It also does not eliminate the cost of protecting data, because data security is still the customer's responsibility.</p></div>
`,summary:["On-prem is mostly fixed cost/CapEx; the cloud shifts to variable cost/OpEx.","On-prem has many hidden costs: power, cooling, floor space, staff, hardware replacement, spare machines.","TCO is the sum of all costs of owning and operating over the whole lifetime; compare cloud and on-prem using TCO.","Economies of scale let AWS offer lower prices.","After moving to EC2 you still have: patching the guest OS, software licenses, application configuration, and the work of writing new features.","BYOL = bring existing licenses to AWS; License Included = the price already covers the license; Dedicated Hosts for licenses per socket/core; Marketplace to buy third-party software billed by the hour; License Manager to track licenses.","Rightsizing (based on CloudWatch + Compute Optimizer) and automation keep you from paying for unused resources or manual work."],terms:[["Fixed cost","a cost you pay regardless of how much you use"],["Variable cost","a cost that changes with usage"],["CapEx (Capital Expenditure)","money spent upfront to buy long-lived assets"],["OpEx (Operational Expenditure)","ongoing spending to run or use a service"],["TCO (Total Cost of Ownership)","all direct and indirect costs of owning and running a system over its lifetime"],["Hardware refresh","periodically replacing old hardware with new"],["Cooling","keeping data center equipment from overheating"],["Economies of scale","lower cost per unit thanks to operating at huge scale"],["License","paid permission to use software"],["BYOL (Bring Your Own License)","reusing licenses you already own on AWS"],["License-included","the price already covers the software license"],["Rightsizing","matching resource size to actual need"],["Utilization","how much of a resource's capacity is actually used"],["AWS Marketplace","a catalog of third-party software sold on AWS"],["AWS License Manager","a service for tracking and managing software licenses"],["Automation","having tasks run automatically instead of by hand"]]};
L.course["1-4"]={title:"AWS Well-Architected Framework: the 6 pillars",goals:["Understand what the Well-Architected Framework is and what it is for","Explain the meaning of each of the 6 pillars in simple words","Spot the keywords in a question to pick the right pillar","Know what the AWS Well-Architected Tool is used for"],html:`
<h3>What is the Well-Architected Framework?</h3>
<p>The <b>AWS Well-Architected Framework</b> is a set of guidance and questions that helps you assess whether a system in the cloud is "well designed". It gathers system design experience into <b>6 pillars</b>, and each pillar has its own <b>design principles</b> and best practices.</p>
<div class="box idea"><b>🧠 In plain terms</b><p>It is like an inspection standard for a house: is the foundation solid, is it fire safe, does it waste electricity, is it easy to maintain? It is not a law you must obey, but a checklist for assessing and improving your own work.</p></div>

<h3>The first three pillars: operations, security, reliability</h3>
<p><b>1. Operational Excellence</b>: running and monitoring systems well, and continually improving processes. Typical principles: <b>safely automate where possible</b> (that is, run operations with code, for example building infrastructure with AWS CloudFormation; older documentation calls this <i>perform operations as code</i>), <b>implement observability for actionable insights</b> (measure and monitor so you can make decisions), make frequent, small, reversible changes; learn from all operational events and metrics; <b>use managed services</b> (to reduce the operational burden).</p>
<p><i>BanhNgon Bakery example:</i> Minh writes a script that deploys the website automatically instead of doing it by hand, and after every incident he writes up the "lessons learned".</p>
<p><b>2. Security</b>: protecting data, systems, and assets. Principles: implement a strong identity foundation (least privilege), apply security at all layers, protect data in transit and at rest, and <b>maintain traceability</b> so you know who did what.</p>
<p><i>BanhNgon example:</i> sales staff can only view orders and cannot delete the database; customer data is encrypted.</p>
<p><b>3. Reliability</b>: the system performs its function correctly and consistently, <b>recovers by itself from failures</b>, and meets demand. Principles: automatically recover from failure, test recovery procedures, scale horizontally to increase aggregate workload availability, stop guessing capacity.</p>
<p><i>BanhNgon example:</i> the website runs in 2 Availability Zones, the database has a standby copy, and there is a recovery plan that has been rehearsed.</p>

<h3>The last three pillars: performance, cost, sustainability</h3>
<p><b>4. Performance Efficiency</b>: using computing resources efficiently to meet requirements, and staying efficient as demand and technology change. Principles: use managed services to reduce operational complexity (so you do not have to run complex technology yourself), <b>deploy workloads closer to your customers</b> (older documentation: <i>go global in minutes</i>), build scalable architectures (for example serverless), experiment more often.</p>
<p><i>BanhNgon example:</i> choosing an instance type that fits the load, and using CloudFront so cake photos load fast for customers in Japan.</p>
<p><b>5. Cost Optimization</b>: delivering business value at the lowest cost and avoiding unnecessary costs. Principles: implement Cloud Financial Management, adopt a consumption model (pay for what you use), measure business outcomes relative to costs, use managed services and automation, implement granular cost allocation (for example with tags).</p>
<p><i>BanhNgon example:</i> shutting down test machines at night, rightsizing, and tagging resources to see the cost of each branch.</p>
<p><b>6. Sustainability</b>: reducing the environmental impact of your systems. Principles: understand your impact, establish sustainability goals, <b>maximize utilization</b> (no machines running idle), anticipate and adopt new, more efficient hardware and software offerings, minimize the footprint of data and its processing (keep only the data you really need).</p>
<p><i>BanhNgon example:</i> consolidating several lightly used machines into one that runs at a proper load, and deleting old data that is no longer needed.</p>

<h3>Comparison table and keywords</h3>
<table>
<tr><th>Pillar</th><th>Core question</th><th>Keywords in the question</th></tr>
<tr><td>Operational Excellence</td><td>Do we operate and improve well?</td><td>operations as code, automate safely, observability, small frequent changes, learn from failures, runbooks, use managed services</td></tr>
<tr><td>Security</td><td>Are data and systems protected?</td><td>least privilege, encryption, traceability, protect data, identity</td></tr>
<tr><td>Reliability</td><td>Does it recover by itself and meet demand?</td><td>recover from failures, automatically recover, Multi-AZ, test recovery</td></tr>
<tr><td>Performance Efficiency</td><td>Are we using the right type of resource efficiently?</td><td>select right resource type, serverless, deploy workloads closer to your customers, experiment more often</td></tr>
<tr><td>Cost Optimization</td><td>Are we avoiding wasted spend?</td><td>avoid unnecessary costs, pay-as-you-go, measure efficiency</td></tr>
<tr><td>Sustainability</td><td>Are we reducing environmental impact?</td><td>environmental impact, maximize utilization, energy, carbon</td></tr>
</table>

<h3>Design principles: the exam often quotes them word for word</h3>
<p>Questions often give the name of a <b>design principle</b> and ask which pillar it belongs to. The table below follows the <b>current Well-Architected Framework documentation</b> (Operational Excellence has 7 principles) on docs.aws.amazon.com (checked November 2026). AWS has changed the wording several times, so the "older names" column lists the <b>older names</b> that third-party books, courses, and practice exams still often use. Whichever name you meet, you should be able to recognize the pillar.</p>
<table>
<tr><th>Pillar</th><th>Current design principles</th><th>Older names common in study materials</th><th>In plain terms</th></tr>
<tr><td>Operational Excellence</td><td>Implement observability for actionable insights; Safely automate where possible; Make frequent, small, reversible changes; Refine operations frequently; Anticipate failure; Learn from all operational events and metrics; <b>Use managed services</b></td><td>Perform operations as code (now <i>Safely automate where possible</i>); Refine operations procedures frequently; Learn from all operational failures; Organize teams around business outcomes (found in the Operational Excellence Pillar whitepaper; the current framework page no longer lists it)</td><td>Organize teams around business goals, measure so you can decide, automate with code (including runbooks) with safety guardrails, change a little at a time and be able to roll back, learn from incidents without blaming anyone (blameless), use managed services to reduce operational work</td></tr>
<tr><td>Security</td><td>Implement a strong identity foundation; <b>Maintain traceability</b>; Apply security at all layers; Automate security best practices; Protect data in transit and at rest; Keep people away from data; Prepare for security events</td><td>Enable traceability (now <i>Maintain traceability</i>)</td><td>Least privilege, keeping an audit trail, many layers of protection (edge, VPC, subnet, instance, code), encryption, using dashboards/tools instead of letting people access data directly</td></tr>
<tr><td>Reliability</td><td>Automatically recover from failure; Test recovery procedures; Scale horizontally to increase aggregate workload availability; Stop guessing capacity; Manage change through automation</td><td>Manage change in automation</td><td>Recover automatically, rehearse recovery, many small machines instead of one big one</td></tr>
<tr><td>Performance Efficiency</td><td>Use managed services to reduce operational complexity; Deploy workloads closer to your customers; Build scalable architectures; Experiment more often; Consider mechanical sympathy; Design for change and variable demand</td><td>Democratize advanced technologies; Go global in minutes; Use serverless architectures</td><td>Use ready-made services (AI, NoSQL…) instead of building deep expertise yourself, place systems close to customers, choose technology that fits how the data is used</td></tr>
<tr><td>Cost Optimization</td><td>Implement Cloud Financial Management; Adopt a consumption model; Measure business outcomes relative to costs; Use managed services and automation; Implement granular cost allocation</td><td>Measure overall efficiency; Stop spending money on undifferentiated heavy lifting; Analyze and attribute expenditure</td><td>Have a finance + engineering team that owns the cost culture, pay for what you use, measure cost against the value created, tag resources to know who spends how much</td></tr>
<tr><td>Sustainability</td><td>Understand your impact; Establish sustainability goals; Maximize utilization; Anticipate and adopt new, more efficient hardware and software offerings; Align computational approach to problem complexity; Minimize the footprint of data and its processing</td><td>Use managed services; Reduce the downstream impact of your cloud workloads</td><td>Measure your impact, no machines running idle, move to more efficient hardware, do not use a sledgehammer to crack a nut, keep only data that has a clear purpose</td></tr>
</table>
<p><b>"Use managed services"</b> now appears in several pillars: on its own it is a principle of <b>Operational Excellence</b> (reducing the operational burden); in the form "…to reduce operational complexity" it belongs to <b>Performance Efficiency</b>; in the form "…and automation" it belongs to <b>Cost Optimization</b>. Older documentation also placed it under Sustainability. When a question asks about it, read the whole phrase and the stated purpose carefully (reducing operations, using difficult technology, or saving cost).</p>
<p><b>Cloud Financial Management</b> means building the capability and culture of managing cost: a group of finance and technical people trains engineers in cost awareness, sets spending targets, and reviews usage together with the product teams. This belongs to <b>Cost Optimization</b>.</p>
<div class="box trap"><b>⚠️ Common trap</b><p>"Stop guessing capacity" is both one of the 6 advantages of cloud and a principle of <b>Reliability</b> (not Cost Optimization). "Democratize advanced technologies" (the older name; now "Use managed services to reduce operational complexity": using a managed AI service instead of training a model yourself) belongs to <b>Performance Efficiency</b>. "Keep people away from data" belongs to <b>Security</b>.</p></div>
<div class="box example"><b>🍰 Example: BanhNgon</b><p>After a year on AWS, Minh uses the <b>AWS Well-Architected Tool</b> in the Console to answer the questions about the BanhNgon system himself. The tool points out: data recovery has never been rehearsed (Reliability), a few machines run idle all night (Cost Optimization and Sustainability), and one account has permissions that are too broad (Security). Minh plans to fix each item.</p></div>
<p>The <b>AWS Well-Architected Tool</b> is a free service in the Console that helps you review a workload against the framework's best practices. You answer a set of questions for each pillar, and the tool flags the <b>high-risk issues</b>, lets you save a <b>milestone</b> (a snapshot of the state at a point in time, to compare against later), and creates an <b>improvement plan</b>.</p>
<p><b>Well-Architected Lenses</b> are <i>additional</i> sets of questions and guidance for a specific industry or type of technology, used on top of a review against the 6 general pillars. Examples: lenses for the Financial Services Industry, Serverless, SaaS, Machine Learning, Data Analytics. In the Well-Architected Tool you can apply a lens from the built-in catalog or create your own custom lens.</p>

<h3>Trade-offs between pillars</h3>
<p>The pillars sometimes "pull" in opposite directions. Running a system in several Regions improves Reliability but costs more (Cost Optimization). Using very powerful machines helps Performance but can be wasteful when traffic is low. That is why the framework advises you to <b>review regularly</b>, not just once, and to choose a balance that fits your business goals.</p>
<p>According to the Well-Architected documentation, <b>Security</b> and <b>Operational Excellence</b> generally <b>should not be traded off</b> against the other pillars. Trade-offs usually happen among Reliability, Performance Efficiency, Cost Optimization, and Sustainability. For example, an internal test website can accept lower reliability than a payment system in order to save money, but it must not skip security.</p>
<div class="box idea"><b>🧠 In plain terms</b><p>It is like choosing a vehicle for cake deliveries: a big truck carries a lot but burns fuel, a motorbike is cheap but carries little. There is no "best" vehicle, only the one that fits the shop's needs and budget at that moment.</p></div>
<div class="box exam"><b>🎯 What the exam asks</b><ul>
<li>"recover from failures and meet demand" → <b>Reliability</b>.</li>
<li>"perform operations as code", "safely automate where possible", "implement observability", "use managed services to reduce operational burden" → <b>Operational Excellence</b>.</li>
<li>"minimize environmental impact", "maximize utilization" → <b>Sustainability</b>.</li>
<li>"use computing resources efficiently", "select the right instance type" → <b>Performance Efficiency</b>.</li>
<li>"avoid unnecessary costs" → <b>Cost Optimization</b>.</li>
<li>"review workloads against Well-Architected best practices", "milestone", "improvement plan", "high-risk issues" → <b>AWS Well-Architected Tool</b>.</li>
<li>"additional best-practice guidance specific to an industry or technology" → <b>Well-Architected lens</b>.</li>
<li>"pillars generally NOT traded off" → <b>Security</b> and <b>Operational Excellence</b>.</li>
<li>"strong identity foundation", "traceability", "apply security at all layers", "keep people away from data" → <b>Security</b>.</li>
<li>"test recovery procedures", "scale horizontally", "stop guessing capacity" → <b>Reliability</b>.</li>
<li>"frequent, small, reversible changes", "blameless post-incident review", "runbooks as code" → <b>Operational Excellence</b>.</li>
<li>"democratize advanced technologies", "use serverless architectures", "go global in minutes" / "deploy workloads closer to your customers", "experiment more often" → <b>Performance Efficiency</b>.</li>
<li>"Cloud Financial Management", "consumption model", "granular cost allocation", "tag and attribute costs per team" → <b>Cost Optimization</b>. "Stop spending money on undifferentiated heavy lifting" is the <b>older name</b> of a Cost Optimization principle (the phrase "undifferentiated heavy lifting" also often appears when talking about the advantages of cloud): if the question asks for a pillar and mentions <b>cost</b>, choose <b>Cost Optimization</b>.</li>
<li>"adopt new, more efficient hardware", "establish sustainability goals", "minimize the footprint of data" → <b>Sustainability</b> (older documentation: "use managed services to share infrastructure" also belongs to Sustainability).</li>
</ul></div>
<div class="box trap"><b>⚠️ Common trap</b><p>"Maximize utilization" may make you think of Performance or Cost, but when the question mentions the <i>environment</i> (environmental impact, energy) the answer is <b>Sustainability</b>. And "go global in minutes" is both one of the 6 advantages of cloud and the older name of a Performance Efficiency principle (now "Deploy workloads closer to your customers"): read carefully whether the question is asking about an advantage or about a pillar.</p></div>
`,summary:["The Well-Architected Framework is a set of best practices for assessing and improving systems on AWS.","The 6 pillars: Operational Excellence, Security, Reliability, Performance Efficiency, Cost Optimization, Sustainability.","Operations as code / safely automate, observability, use managed services → Operational Excellence; recover from failures → Reliability.","Choosing the right resource type, serverless, democratize → Performance Efficiency; avoiding wasted spend → Cost Optimization; identity, traceability, all layers → Security.","Reducing environmental impact, maximizing utilization → Sustainability.","The AWS Well-Architected Tool helps you review a workload against the framework (milestone, improvement plan, high-risk issues); lenses add questions for a specific industry/technology.","Security and Operational Excellence are generally not traded off; Cloud Financial Management belongs to Cost Optimization."],terms:[["Well-Architected Framework","AWS's set of best practices for designing good cloud systems"],["Pillar","one of the six main areas of the framework"],["Design principle","a guiding rule for designing systems"],["Best practice","a proven, recommended way of doing something"],["Operational Excellence","running, monitoring, and continually improving systems well"],["Security","protecting data, systems, and assets"],["Reliability","working correctly and recovering from failures"],["Performance Efficiency","using computing resources efficiently"],["Cost Optimization","delivering value at the lowest cost"],["Sustainability","reducing environmental impact"],["Operations as code","running operations through code instead of by hand"],["Workload","an application or system that delivers business value"],["Traceability","being able to track who did what"],["Lens","an extra set of questions for a specific industry/technology"],["Cloud Financial Management","building the practice and culture of managing cloud costs"]]};
L.course["1-5"]={title:"Migrating to the cloud: the 7 Rs, AWS CAF, and migration tools",goals:["Tell the 7 migration strategies (7 Rs) apart through examples","Know the 6 perspectives of AWS CAF and how they split into business and technical groups","Remember the 4 business outcomes that AWS CAF names","Know at a basic level which migration tool is used for what"],html:`
<h3>What is migration?</h3>
<p><b>Migration</b> means moving applications, data, and servers from on-premises (or from another cloud) to AWS. Not every application is migrated the same way. AWS groups the approaches into <b>7 strategies</b>, often called the <b>7 Rs</b> because they all start with the letter R.</p>
<div class="box idea"><b>🧠 In plain terms</b><p>It is like moving house: some things you carry over as they are, some you fix up a little before taking them, some you rebuild completely, some you sell and buy new, some you throw away, and some you leave at the old house for now.</p></div>

<h3>The 7 migration strategies (7 Rs)</h3>
<p><b>1. Rehost</b> ("lift and shift"): move the application as is, with no code changes. The fastest and lowest-risk option.<br><i>BanhNgon Bakery:</i> copy the website server in the storeroom, unchanged, to a virtual machine on AWS.</p>
<p><b>2. Replatform</b> ("lift, tinker and shift"): optimize a little to take advantage of the cloud, but <i>without changing the core architecture</i>.<br><i>BanhNgon:</i> replace the self-installed MySQL database with Amazon RDS, managed by AWS, while the code stays almost the same.</p>
<p><b>3. Refactor / Re-architect</b>: rewrite and redesign the application to use cloud-native features, usually to scale better or move faster. The most effort.<br><i>BanhNgon:</i> split the ordering system into serverless functions running on AWS Lambda.</p>
<p><b>4. Repurchase</b> ("drop and shop"): drop the old software and switch to a different product, usually SaaS.<br><i>BanhNgon:</i> drop the customer management software installed on a PC and switch to a SaaS CRM.</p>
<p><b>5. Retire</b>: switch off applications that are no longer needed.<br><i>BanhNgon:</i> last year's Mid-Autumn Festival promotion page is no longer used by anyone, so it is simply turned off.</p>
<p><b>6. Retain</b>: keep the application on-premises for now and do not migrate it yet, perhaps because it was just upgraded, has special requirements, or the time is not right.<br><i>BanhNgon:</i> the cash register at the counter must keep working even when the internet is down, so it stays in the shop.</p>
<p><b>7. Relocate</b>: move the whole virtualized infrastructure to the cloud without buying new hardware or changing the applications, for example moving a VMware environment to VMware Cloud on AWS.<br><i>BanhNgon:</i> suppose the storeroom had a cluster of VMware virtual machines running many small applications; Minh would move the whole cluster to AWS in one go.</p>
<table>
<tr><th>Strategy</th><th>Code changes</th><th>Keywords in the question</th></tr>
<tr><td>Rehost</td><td>None</td><td>as quickly as possible, without changes, lift and shift</td></tr>
<tr><td>Replatform</td><td>Very few</td><td>some optimization, move DB to RDS, without changing core architecture</td></tr>
<tr><td>Refactor</td><td>Many</td><td>re-architect, cloud-native, serverless, microservices</td></tr>
<tr><td>Repurchase</td><td>Replace the product</td><td>move to SaaS, different product</td></tr>
<tr><td>Retire</td><td>Switch off</td><td>no longer needed, decommission</td></tr>
<tr><td>Retain</td><td>Stays where it is</td><td>keep on-premises, not ready to migrate</td></tr>
<tr><td>Relocate</td><td>None</td><td>VMware, move hypervisor-level infrastructure</td></tr>
</table>
<p>Three points that tend to be asked in more depth:</p>
<ul>
<li><b>Why choose Rehost first?</b> When there is a tight deadline (a data center lease is ending, hundreds of applications must move), rehosting lets you move <i>fast, at scale, with few changes</i>; you optimize gradually once you are in the cloud.</li>
<li><b>Replatform does not necessarily mean changing code.</b> For example, moving a Java application from a self-installed, self-patched Tomcat to AWS Elastic Beanstalk keeps the code unchanged, but AWS now takes care of the platform, capacity, and load balancing. Swapping the "base" for a managed service = Replatform.</li>
<li><b>Relocate</b> keeps all your existing tools and operating processes (for example thousands of VMware virtual machines), with no new hardware to buy and no applications to rewrite.</li>
</ul>

<h3>AWS Cloud Adoption Framework (AWS CAF)</h3>
<p>Moving to the cloud is not only a technical matter. People, processes, and budgets have to change too. <b>AWS CAF</b> (Cloud Adoption Framework) is a set of guidance that helps an organization prepare on all fronts, divided into <b>6 perspectives</b>:</p>
<table>
<tr><th>Group</th><th>Perspective</th><th>What it means, simply</th></tr>
<tr><td rowspan="3">Business</td><td><b>Business</b></td><td>Cloud investments must serve business goals (strategy, products, data)</td></tr>
<tr><td><b>People</b></td><td>Culture, organizational structure, leadership, workforce skills</td></tr>
<tr><td><b>Governance</b></td><td>Program/project management, tracking the benefits delivered, managing cloud spending (financial management), risk management. Usually the concern of the CFO and the chief risk officer</td></tr>
<tr><td rowspan="3">Technical</td><td><b>Platform</b></td><td>Building an enterprise-grade, scalable, hybrid cloud platform</td></tr>
<tr><td><b>Security</b></td><td>Keeping data and workloads confidential, intact, and available: identity and permission management, threat detection, incident response. Usually the concern of the CISO</td></tr>
<tr><td><b>Operations</b></td><td>Making sure cloud services run at the level the business needs: incident/problem management, patching, monitoring (observability), change and release management</td></tr>
</table>
<p>Memory tip: <b>BPG</b> (Business, People, Governance) is the "office side"; <b>PSO</b> (Platform, Security, Operations) is the "technical side".</p>
<p>AWS CAF also names <b>4 business outcomes</b> that the cloud delivers:</p>
<ul>
<li><b>Reduced business risk</b>: lower risk for the business.</li>
<li><b>Improved ESG performance</b>: better environmental, social, and governance results.</li>
<li><b>Increased revenue</b>: more income.</li>
<li><b>Increased operational efficiency</b>: running the business more efficiently.</li>
</ul>
<p>How to recognize them: detecting fraud faster, more stable systems, better security → <b>reduced business risk</b>. Cutting carbon emissions → <b>improved ESG performance</b>. Launching new products, reaching new customers → <b>increased revenue</b>. Lower operating costs, more productive work → <b>increased operational efficiency</b>.</p>
<h4>The 4 transformation domains and 4 phases of CAF</h4>
<p>CAF also describes how the cloud "transforms" an organization across 4 <b>transformation domains</b>, arranged as a value chain:</p>
<ul>
<li><b>Technology</b>: migrating and modernizing infrastructure, applications, and data.</li>
<li><b>Process</b>: digitizing, automating, and optimizing business processes, often using data, analytics, and machine learning.</li>
<li><b>Organization</b>: reorganizing how teams work, around products and customer value.</li>
<li><b>Product</b>: redesigning the business model, creating new products and revenue streams.</li>
</ul>
<p>The transformation journey goes through 4 <b>phases</b>, repeated over and over:</p>
<div class="flow"><span>Envision</span><span>Align</span><span>Launch</span><span>Scale</span></div>
<ul>
<li><b>Envision</b>: identify transformation opportunities tied to business goals.</li>
<li><b>Align</b>: find capability gaps across the 6 perspectives, get stakeholders aligned, and make a plan.</li>
<li><b>Launch</b>: deliver a few pilot projects in production to prove value step by step.</li>
<li><b>Scale</b>: expand the pilots to full scale and achieve the desired business benefits.</li>
</ul>
<div class="box example"><b>🍰 Example: BanhNgon</b><p>Before moving fully, Lan and Minh sit down and go through CAF. <i>Business</i>: the goal is to sell more during the Tet season. <i>People</i>: send staff to a basic AWS course. <i>Governance</i>: set a monthly budget and cost alerts. <i>Platform</i>: design the system on AWS. <i>Security</i>: define who may access what. <i>Operations</i>: who is on call, and how incidents are handled. Desired outcomes: increased revenue and a lower risk of the website going down.</p></div>

<h3>AWS migration tools</h3>
<p>At the Cloud Practitioner level, you only need to know which tool does what:</p>
<table>
<tr><th>Tool</th><th>What it does</th><th>Stage</th></tr>
<tr><td><b>Migration Evaluator</b></td><td>Analyzes your current systems, builds a business case, and estimates the cost of moving to AWS</td><td>Assessment</td></tr>
<tr><td><b>AWS Application Discovery Service</b></td><td>Collects information about on-prem servers: configuration, utilization, dependencies between machines (note: since November 7, 2025, it no longer accepts new customers and AWS recommends AWS Transform; the exam may still ask about it using this description)</td><td>Discovery</td></tr>
<tr><td><b>AWS Application Migration Service</b></td><td>Moves servers to AWS in rehost (lift and shift) style, replicating continuously to reduce downtime</td><td>Server migration</td></tr>
<tr><td><b>AWS DMS</b> (Database Migration Service)</td><td>Migrates databases; the source database keeps working normally during the migration; supports the same engine type (MySQL → MySQL) and different types (Oracle → PostgreSQL); replicates changes continuously for minimal downtime</td><td>Database migration</td></tr>
<tr><td><b>AWS SCT</b> (Schema Conversion Tool)</td><td>Converts the database structure (schema) when switching to a different type of database, for example Oracle to PostgreSQL</td><td>Database migration</td></tr>
<tr><td><b>AWS Migration Hub</b></td><td>A single place to track migration progress across many tools (note: since November 7, 2025, the service no longer accepts new customers and AWS recommends AWS Transform; but the exam may still ask about it using this description)</td><td>Tracking</td></tr>
<tr><td><b>AWS DataSync</b></td><td>Transfers large amounts of <i>files</i> over the network (internet or Direct Connect) from on-prem file servers (NFS, SMB…) to S3, EFS, FSx; automatic scheduling, encryption in transit, data integrity checks (note: DataSync is not on the current CLF-C02 in-scope list, but it still shows up often in practice exams)</td><td>File data migration</td></tr>
<tr><td><b>AWS Snowball</b> (AWS Snow Family)</td><td>A <b>physical</b> device AWS ships to your site: you copy data onto it and send it back, and AWS loads it into S3. Used when you must move <b>TBs to PBs</b> and the network link is too slow or too expensive (note: since November 7, 2025, Snowball Edge no longer accepts new customers and AWS recommends DataSync or AWS Data Transfer Terminal; the Snow Family is also no longer on the current CLF-C02 in-scope list, but practice exams very often ask "petabytes, limited bandwidth, offline transfer" → Snowball)</td><td>Offline data migration</td></tr>
</table>
<p>Besides tools, AWS also has the <b>AWS Migration Acceleration Program (MAP)</b>: it is for businesses that want to move many workloads but lack experience. MAP provides a structured methodology, tools, experts from AWS Partners, and investment from AWS (for example credits) to offset part of the migration cost.</p>
<div class="flow"><span>Migration Evaluator</span><span>Application Discovery Service</span><span>Application Migration Service / DMS</span><span>Migration Hub tracks progress</span></div>
<div class="box exam"><b>🎯 What the exam asks</b><ul>
<li>"as quickly as possible without changes" → <b>Rehost</b>; "self-managed MySQL → Amazon RDS" → <b>Replatform</b>; "move to SaaS" → <b>Repurchase</b>.</li>
<li>"perspectives of AWS CAF" → Business, People, Governance, Platform, Security, Operations (distractors: Pricing, Networking, Marketing).</li>
<li>"culture, organizational structure, leadership, workforce skills" → <b>People</b>; "enterprise-grade, scalable, hybrid cloud platform" → <b>Platform</b>.</li>
<li>"business outcome of cloud adoption" → for example <b>Reduced business risk</b>; "reduce carbon footprint" → <b>Improved ESG performance</b>.</li>
<li>"program management, benefits, cloud spending, risk" → <b>Governance</b>; "incident, patch, observability, change and release management" → <b>Operations</b>; "identity, threat detection, incident response" → <b>Security</b>.</li>
<li>"digitize and automate business processes, analytics, ML" → transformation domain <b>Process</b>; "deliver pilot initiatives in production" → phase <b>Launch</b>.</li>
<li>"one-time online transfer of many TB of files from NFS/SMB to Amazon S3" → <b>AWS DataSync</b>; "Oracle → Aurora PostgreSQL" → <b>SCT</b> (schema) + <b>DMS</b> (data).</li>
<li>"program with methodology, partners, AWS credits for large migrations" → <b>AWS Migration Acceleration Program (MAP)</b>.</li>
<li>"migrate database with minimal downtime, continuous replication" → <b>AWS DMS</b>.</li>
<li>"move petabytes of data, limited or no network bandwidth, physical device" → <b>AWS Snowball</b> (a physical device; it no longer accepts new customers but still appears in practice exams).</li>
<li>"collect information about on-premises servers, dependencies" → <b>AWS Application Discovery Service</b>; "lift and shift many servers" → <b>AWS Application Migration Service</b>; "track progress of migrations" → <b>AWS Migration Hub</b>.</li>
</ul></div>
<div class="box trap"><b>⚠️ Common trap</b><p><b>Security</b> is both a CAF perspective and a Well-Architected pillar: read carefully which framework the question is asking about. And remember: Rehost changes nothing; Replatform makes light changes (usually adopting a managed service) but keeps the architecture; only Refactor is a rewrite. DMS migrates the data, while SCT converts the schema when you change database type.</p></div>
`,summary:["The 7 Rs: Rehost (as is), Replatform (light tweaks), Refactor (rewrite), Repurchase (switch to SaaS), Retire (switch off), Retain (keep), Relocate (move VMware infrastructure).","AWS CAF has 6 perspectives: Business, People, Governance (business) and Platform, Security, Operations (technical).","The 4 business outcomes: reduced business risk, improved ESG performance, increased revenue, increased operational efficiency.","CAF: 4 transformation domains (Technology, Process, Organization, Product); 4 phases (Envision, Align, Launch, Scale).","Migration Evaluator: business case; Application Discovery Service: server discovery; Migration Hub: progress tracking.","Application Migration Service: rehost servers; DMS: migrate databases with little downtime; SCT: convert schemas; DataSync: transfer files over the network; MAP: a support program for large migrations."],terms:[["Migration","moving applications and data to the cloud"],["Rehost (lift and shift)","move as is, with no changes"],["Replatform","move with light optimization"],["Refactor / Re-architect","redesign and rewrite the application"],["Repurchase","replace with a new product, usually SaaS"],["Retire","switch off what is no longer needed"],["Retain","keep where it is for now"],["Relocate","move the virtualized infrastructure as a whole"],["AWS CAF (Cloud Adoption Framework)","AWS guidance for preparing an organization to adopt the cloud"],["Perspective","one of the six viewpoints in AWS CAF"],["Business outcome","a result the business gains"],["ESG","environmental, social, and governance"],["Schema","the structure of a database"],["Downtime","time when a system is not available"],["Business case","an analysis justifying an investment"],["Transformation domain","an area of the organization that the cloud transforms"],["Pilot","a small trial project"]]};
})();
