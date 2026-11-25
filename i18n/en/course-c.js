(function(){var I=window.CLF_I18N=window.CLF_I18N||{};var L=I.en=I.en||{};['q','course','lessons','glossary','services','domains','ui'].forEach(function(k){L[k]=L[k]||{};});
L.course["3-1"]={title:"Global infrastructure: Regions, Availability Zones, edge locations",goals:["Understand what a Region, an Availability Zone (AZ), and an edge location are, and how they nest inside one another","Know the 4 factors for choosing a Region: compliance, latency, service availability, pricing","Tell when to use multiple AZs (high availability) and when to use multiple Regions (disaster recovery, low latency, data sovereignty)","Recognize Local Zones and AWS Outposts in exam questions"],html:`
<h3>First things first: where is "the cloud" actually located?</h3>
<p>When people hear the word "cloud", many imagine data floating around somewhere. In reality, everything on AWS runs on real computers, housed in real buildings called <b>data centers</b>.</p>
<p>A data center is a building that holds thousands of servers, with backup power, cooling systems, high-speed network links, and strict security. You will never be allowed inside. You simply "rent" a share of those servers' power over the internet.</p>
<p>AWS has data centers in many places around the world. To keep things manageable, AWS organizes this infrastructure into three layers: <b>Regions</b>, <b>Availability Zones</b>, and <b>edge locations</b>. Understanding these three layers is the foundation for almost every "availability" question on the exam.</p>

<div class="box idea"><b>🧠 In plain terms</b>
<p>Picture a big supermarket chain. A <b>Region</b> is like a city where the chain operates (Hanoi, Tokyo, Singapore…). An <b>Availability Zone</b> is like one of the separate warehouses in that city, a few dozen kilometers apart, each with its own power supply. An <b>edge location</b> is like a small convenience store on the corner: it doesn't stock everything, but it keeps the most popular items on hand so customers can grab them quickly.</p>
</div>

<h3>Regions and Availability Zones</h3>
<p>A <b>Region</b> is a separate geographic area of the world, for example Asia Pacific (Singapore), Asia Pacific (Tokyo), or US East (N. Virginia). Each Region has a code name; for example, <code>ap-southeast-1</code> is Singapore. Regions are independent of one another: your data stays in the Region where you put it, unless you yourself choose to copy it somewhere else.</p>
<p>Inside each Region there are multiple <b>Availability Zones</b> (AZs). An AZ is <b>one or more separate data centers</b> with its own redundant power, networking, and connectivity. A Region typically has <b>at least 3 AZs</b>.</p>
<p>The key point: the AZs in a Region are far enough apart that an incident (fire, flood, an area-wide power outage) in one AZ does not take down another. In exam language: AZs <b>do not share a single point of failure</b> (one component whose failure brings everything down). At the same time, they are close enough, and linked by high-speed, low-latency networking, that an application can run across several AZs at once smoothly.</p>

<div class="flow"><span>AWS global infrastructure</span><span>Region (e.g., Singapore)</span><span>Multiple AZs (usually ≥ 3)</span><span>Each AZ = 1 or more data centers</span></div>

<h4>Multi-AZ: surviving failures within one Region</h4>
<p>If you run your application on a single server in a single AZ, the application goes down whenever that AZ has a problem. The standard approach is to place copies of the application in <b>at least 2 AZs</b>. If one AZ fails, the other keeps serving customers. This is <b>high availability</b>.</p>

<h4>Multi-Region: when one Region isn't enough</h4>
<p>There are several reasons to use <b>multiple Regions</b>:</p>
<ul>
<li><b>Disaster recovery</b> (getting systems back after a major disaster) and <b>business continuity</b> (keeping the business running): in case an entire Region suffers a major incident.</li>
<li><b>Low latency</b> (short response delay) for customers on several continents: each group of customers uses the Region closest to them.</li>
<li><b>Data sovereignty</b> (data is subject to the laws of the country where it is stored): some countries' laws require citizens' data to be stored inside the country or the region, so you need a Region there.</li>
</ul>

<div class="box example"><b>🍰 Example: BanhNgon Bakery</b>
<p>In the beginning, the BanhNgon website ran on a single computer in the shop's storeroom. One day the storeroom lost power for a whole afternoon, and every online order was lost. Lan was really upset.</p>
<p>When they moved to AWS, Minh chose the Singapore Region (close to Vietnam). He ran the website on 2 virtual servers placed in 2 different AZs. If one AZ loses power, the other still takes orders. That is multi-AZ.</p>
<p>A few years later, BanhNgon opened a branch in Japan. Japanese customers found the Singapore site a bit slow, and the Japanese partner wanted Japanese customers' data stored in Japan. Minh deployed another copy in the Tokyo Region. That is multi-Region: it lowers latency, meets the data requirement, and provides a "backup copy" in another part of the world.</p>
</div>

<h3>How do you choose a Region?</h3>
<p>The exam loves to ask "which factors should you consider when choosing a Region". Remember these 4 factors:</p>
<table>
<tr><th>Factor (as worded on the exam)</th><th>What it means</th><th>Example</th></tr>
<tr><td><b>Compliance</b> / data sovereignty</td><td>Laws and regulations about where data is stored</td><td>Japanese customers' data must stay in Japan → choose Tokyo</td></tr>
<tr><td><b>Proximity to customers</b> (latency)</td><td>The closer to your customers, the faster the response</td><td>Customers are mostly in Southeast Asia → Singapore</td></tr>
<tr><td><b>Service availability</b></td><td>Not every Region offers every service, especially new ones</td><td>You need a new AI service → check whether that Region has it yet</td></tr>
<tr><td><b>Pricing</b></td><td>The price of the same service differs between Regions</td><td>Some Regions are cheaper than others</td></tr>
</table>
<p>The usual order of priority is: legal compliance first (it's mandatory), then latency, services, and price.</p>

<div class="box trap"><b>⚠️ Common trap</b>
<p>Distractors such as "choose the Region closest to AWS headquarters", "choose the Region with the most AZs", or "choose the Region with the most edge locations" are <b>not</b> standard criteria. And remember: an AZ is <b>one or more</b> data centers, not "exactly one data center", and not "a small Region" either.</p>
</div>

<h3>Edge locations: "supply stations" close to users</h3>
<p>Besides Regions and AZs, AWS also has a large number of <b>edge locations</b> in major cities around the world, far more of them than there are Regions. Edge locations are not used to run your whole application. Their main job is to <b>bring content closer to users</b>.</p>
<p>The classic service that uses edge locations is <b>Amazon CloudFront</b> (a content delivery network, or CDN). CloudFront temporarily stores (<b>caches</b>) files such as images, videos, and web pages at edge locations. A customer in Da Nang who opens a photo of a cream cake receives it from the nearest edge location instead of pulling it all the way from Singapore. <b>Amazon Route 53</b> (the DNS service) and <b>AWS Global Accelerator</b> also make use of the edge network.</p>
<div class="flow"><span>Customer in Da Nang</span><span>Nearest edge location (CloudFront cache)</span><span>If not cached yet: fetch from the Singapore Region</span></div>

<h3>Local Zones and AWS Outposts</h3>
<p>Sometimes customers need extremely low latency but are far from any Region. AWS offers two more options:</p>
<ul>
<li><b>AWS Local Zones</b>: AWS places part of its infrastructure (servers, storage…) right in a major city, closer to end users than a Region is. A good fit for online games, live video editing… anything that needs latency of just a few milliseconds.</li>
<li><b>AWS Outposts</b>: AWS brings its own hardware (in the form of racks) and <b>installs it in your data center</b>. You use AWS services on site, which fits cases where data must stay at your location (on-premises) or where you need extremely low latency to internal systems. This is a form of <b>hybrid</b> setup (part cloud, part on-premises).</li>
</ul>
<p>There are also <b>AWS Wavelength Zones</b> (the CLF-C02 Exam Guide lists Wavelength as <i>out of scope for the exam</i>; you only need to know it so you don't confuse it with Local Zones): AWS infrastructure placed inside a telecom carrier's <b>5G</b> network, for mobile applications that need extremely low latency (self-driving cars, mobile games…).</p>
<table>
<tr><th>Option</th><th>Where it sits</th><th>Who handles the hardware</th><th>When to choose it</th></tr>
<tr><td><b>Region / AZ</b></td><td>AWS data centers</td><td>AWS</td><td>The default for most applications</td></tr>
<tr><td><b>Local Zones</b></td><td>A major city without a Region</td><td>AWS</td><td>You need latency of a few ms to users in that city and don't want to manage hardware yourself</td></tr>
<tr><td><b>Wavelength Zones</b></td><td>Inside a telecom carrier's 5G network</td><td>AWS</td><td>5G mobile applications that need extremely low latency</td></tr>
<tr><td><b>Outposts</b></td><td>Your own data center / building</td><td>AWS supplies and maintains it; you provide the space, power, and network</td><td>Data must stay on site, or you need low latency to on-premises systems, but you still want the same AWS APIs, tools, and services (EC2, EBS…)</td></tr>
</table>

<div class="box trap"><b>⚠️ Common trap</b>
<p>Multiple AZs or multiple Regions? If the requirement is only to "survive the failure of <b>one data center / one AZ</b>", then <b>multi-AZ within a single Region</b> is enough and is the <b>cheapest</b> option. Only when the question says "an entire Region is unavailable" do you need a second Region (replicate the data and prepare recovery resources there). And once the legal and latency requirements are met, two Regions can still differ in <b>price</b> and in <b>available services/features</b>; those are the next two things to compare.</p>
</div>

<div class="box exam"><b>🎯 What the exam asks</b>
<ul>
<li>"one or more discrete data centers with redundant power, networking" → <b>Availability Zone</b></li>
<li>"keep running if one Availability Zone fails" / "do not share single points of failure" → <b>deploy across multiple AZs</b> (high availability)</li>
<li>"an entire Region becomes unavailable", "disaster recovery", "data must stay in a country" → <b>multiple Regions</b></li>
<li>"factors when choosing a Region" → <b>compliance / data sovereignty, proximity (latency), service availability, pricing</b></li>
<li>"cache content closer to users" → <b>edge locations</b> + <b>Amazon CloudFront</b></li>
<li>"run AWS infrastructure in its own data center", "same AWS APIs and tools on premises" → <b>AWS Outposts</b>; "low latency in a metropolitan area with no Region, no hardware to manage" → <b>AWS Local Zones</b>; "5G", "mobile edge" → AWS Wavelength (<i>Wavelength is on the CLF-C02 out-of-scope list; you only need to recognize it to rule out distractors</i>)</li>
<li>"which services use edge locations" → <b>Amazon CloudFront</b>, <b>Amazon Route 53</b> (and Global Accelerator)</li>
<li>"data must stay in a country" → choose a <b>Region located in that country</b>; AWS does not move data out of the Region you choose on its own</li>
<li>"remain available if an AZ fails" → EC2 in <b>at least 2 AZs</b> + an <b>Elastic Load Balancer</b> to spread the load (lesson 3-5)</li>
</ul>
</div>
`,summary:["Region = an independent geographic area; data does not leave a Region unless you copy it.","Availability Zone = one or more separate data centers within a Region; a Region typically has at least 3 AZs, and they do not share a single point of failure.","Multi-AZ → high availability; multi-Region → disaster recovery, low latency worldwide, data sovereignty.","Choose a Region based on 4 factors: compliance, proximity to customers (latency), service availability, pricing.","Edge locations are used by CloudFront (content caching), Route 53, and Global Accelerator; there are far more of them than Regions.","Local Zones bring infrastructure close to major cities; Wavelength Zones sit inside 5G networks; Outposts brings AWS infrastructure into your data center.","Only need to survive the loss of one AZ → multi-AZ (cheaper); must survive the loss of an entire Region → add a second Region."],terms:[["Data center","a building that houses large numbers of servers"],["Region","a separate geographic area where AWS operates"],["Availability Zone (AZ)","one or more separate data centers within a Region"],["Edge location","a site close to users, used to cache content"],["High availability","a system keeps running even when a part fails"],["Single point of failure","one component whose failure brings the whole system down"],["Disaster recovery","restoring systems after a major disaster"],["Business continuity","keeping the business running through disruptions"],["Latency","the delay before a response arrives"],["Data sovereignty","data is subject to the laws of the country where it is stored"],["Compliance","following laws and regulations"],["Cache","temporary storage so content can be served quickly"],["AWS Local Zones","AWS infrastructure placed close to major cities"],["AWS Outposts","AWS infrastructure installed in the customer's own data center"],["AWS Wavelength Zones","AWS infrastructure placed inside a telecom carrier's 5G network"]]};
L.course["3-2"]={title:"Ways to work with AWS: Console, CLI, SDK, Infrastructure as Code",goals:["Know the three basic ways to give AWS instructions: the Management Console, the AWS CLI, and the AWS SDKs, and that all of them go through APIs","Tell a one-time operation from a process that needs to be repeated","Understand Infrastructure as Code with AWS CloudFormation, and that Elastic Beanstalk is PaaS","Review the three deployment models (cloud, hybrid, on-premises) and know what AWS Systems Manager is for"],html:`
<h3>APIs: the "order counter" behind everything</h3>
<p>Before we talk about tools, you need one core concept: the <b>API</b> (Application Programming Interface). An API is a set of "standard commands" that a system exposes so other systems can call in and ask it to do work.</p>
<p>With AWS, every action such as "create a server", "delete a file", or "view the bill" is an API call sent to AWS. Whether you click in a web page or type a command, it all ends up as an API call.</p>

<div class="box idea"><b>🧠 In plain terms</b>
<p>An API is like the order counter at a restaurant. The kitchen (AWS) only takes orders through the counter. You can order by pointing at pictures on the menu (the Console), by reading out the dish name in the exact required format (the CLI), or by letting a food delivery app send the order for you (an SDK). The way you order differs, but everything goes through the same counter.</p>
</div>

<h3>Three ways to give AWS instructions</h3>
<h4>1. AWS Management Console</h4>
<p>The <b>AWS Management Console</b> (the web-based control panel) is the website you sign in to so you can click around, view charts, and create services. It is the easiest option for beginners and is great for exploring, learning, or doing <b>one-time</b> tasks, such as checking the configuration of an S3 bucket while investigating an incident.</p>
<p>Besides the web version there is the <b>AWS Console Mobile Application</b> (a mobile app for iOS/Android). When there is no laptop nearby, the person on call can use a phone to view <b>CloudWatch alarms</b> (alerts), <b>AWS Health</b> events, resource status, and costs, and to perform a few light operations. It does not replace the web version for complex configuration.</p>
<h4>2. AWS CLI</h4>
<p>The <b>AWS CLI</b> (Command Line Interface) is a tool you install on your computer that lets you type text commands to control AWS. For example, one command to list your S3 storage "buckets": <code>aws s3 ls</code>.</p>
<p>The advantage: you can combine many commands into a <b>script</b> (a file of commands, for example a shell script on Linux) that runs automatically, can be repeated as often as you like, or can be scheduled to run every night, all <b>without needing to program</b> in a language such as Python or Java. There is also <b>AWS CloudShell</b>: a command-line window that opens right in your browser, with the CLI already installed and nothing to set up (<i>CloudShell is on the CLF-C02 out-of-scope list; it's good to know for hands-on practice</i>).</p>
<h4>3. AWS SDK</h4>
<p>The <b>AWS SDKs</b> (Software Development Kits) are libraries for programming languages such as Python, Java, JavaScript, .NET, Go… Developers use an SDK to call AWS <b>from inside the application's own code</b>. For example: in a cake-ordering app, when a customer uploads a photo, the code uses the SDK to save the photo to S3.</p>
<p>Why not just send the API calls over HTTPS yourself? Because every API call must be <b>signed</b> (request signing) with credentials, and the code must handle errors and <b>automatically try again</b> (retry) when the network is flaky. The SDK does all of that for you; the developer just calls a function.</p>

<table>
<tr><th>Tool</th><th>How you use it</th><th>Best when</th></tr>
<tr><td>Management Console</td><td>Click in a web page</td><td>Learning, exploring, one-time operations, a visual view</td></tr>
<tr><td>AWS CLI</td><td>Type commands, write scripts</td><td>Automating administration tasks, repeated operations</td></tr>
<tr><td>AWS SDK</td><td>Call from application code</td><td>An application needs to interact with AWS services</td></tr>
</table>

<h3>Once, or over and over?</h3>
<p>An important way of thinking for the exam: for a <b>one-time operation</b>, the Console is enough. But when a task must be done <b>many times, in exactly the same way, in many places</b> (a repeatable process), clicking is both slow and error-prone. That is when you should automate with scripts or, better still, with Infrastructure as Code.</p>

<h3>Infrastructure as Code with AWS CloudFormation</h3>
<p><b>Infrastructure as Code</b> (IaC) means describing your entire infrastructure (servers, networks, databases, permissions…) in a text file. A tool then reads the file and builds everything exactly as described.</p>
<p>The main AWS IaC service is <b>AWS CloudFormation</b>. You write a <b>template</b> (a blueprint) in JSON or YAML format. CloudFormation reads the template and creates a group of resources called a <b>stack</b>. To remove everything, delete the stack and all the resources in it are cleaned up too. When you need it again, create a new stack from the <b>same template</b> and you get an identical environment. The same template can be deployed as stacks in multiple Regions and multiple accounts.</p>
<p>If they would rather not write JSON/YAML, developers can use the <b>AWS CDK</b> (Cloud Development Kit): you describe the infrastructure in a familiar programming language (Python, TypeScript…), and the CDK turns it into a CloudFormation template.</p>

<div class="box idea"><b>🧠 In plain terms</b>
<p>A template is like a <b>cake recipe</b> that spells everything out: 200g of flour, 3 eggs, bake at 180 degrees for 25 minutes. Anyone holding the recipe produces exactly the same cake. Want 10 batches at 10 branches? Just hand out the same recipe. Want to change it? Edit the recipe and bake again, and the old recipe is kept so you can compare.</p>
</div>

<p>Benefits of IaC:</p>
<ul>
<li><b>Repeatable and consistent</b>: create test and production environments that are identical.</li>
<li><b>Fast</b>: stand up a whole system in minutes instead of clicking all day.</li>
<li><b>Fewer human errors</b>: no step gets forgotten.</li>
<li><b>Version control</b>: a template is a file, so you can keep a history of changes just like code.</li>
</ul>
<p>CloudFormation itself does not charge extra for ordinary AWS resources; you pay for the resources it creates. This is also the "perform operations as code" principle in the Operational Excellence pillar of the Well-Architected Framework.</p>

<div class="box example"><b>🍰 Example: BanhNgon Bakery</b>
<p>When BanhNgon had just one website, Minh created everything in the Console. When the Ho Chi Minh City branch and then the Japan branch opened, Minh needed to rebuild almost exactly the same system in each new place. He wrote a CloudFormation template describing: the network, 2 servers in 2 AZs, a load balancer, and a database. In Tokyo, Minh only had to run that template and change a few parameters. In the ordering app's code, Minh's colleague uses the SDK for Python to save photos of custom cake orders to S3.</p>
</div>

<h3>AWS Elastic Beanstalk: just hand over your code</h3>
<p>Not everyone wants to look after servers, load balancing, and auto scaling themselves. <b>AWS Elastic Beanstalk</b> is a <b>PaaS</b>-style service (Platform as a Service): you simply upload your code (Java, .NET, PHP, Node.js, Python, Ruby, Go, Docker…), and Beanstalk handles deployment, server provisioning, load balancing, scaling, and application health monitoring. You can still view and adjust the underlying resources if you want. Beanstalk has no additional charge; you pay for the resources it uses.</p>

<div class="box trap"><b>⚠️ Common trap</b>
<p><b>CloudFormation</b> = "provision resources using templates", "repeatable", "infrastructure as code". <b>Elastic Beanstalk</b> = "upload code, AWS handles deployment, capacity, load balancing, scaling". Both services automate things, but CloudFormation describes infrastructure, while Beanstalk focuses on running a web application from your code.</p>
</div>

<h3>Deployment models and AWS Systems Manager</h3>
<p>A reminder of the three <b>deployment models</b> you learned in Domain 1:</p>
<ul>
<li><b>Cloud</b> (everything in the cloud): everything runs on AWS.</li>
<li><b>Hybrid</b> (a mix): part runs in your own data center (on-premises), part runs on AWS, and the two are connected.</li>
<li><b>On-premises</b> (on site, also called private cloud): everything runs on the company's own infrastructure.</li>
</ul>
<p>When you have servers both on AWS and on site, management gets messy. <b>AWS Systems Manager</b> lets you view and operate your whole "fleet" of servers (EC2 and on-premises servers too) from one place: apply patches (software fixes) in bulk, run commands on many machines at once, log in to servers securely without opening the SSH port (Session Manager), and store configuration and parameters (Parameter Store).</p>

<div class="box exam"><b>🎯 What the exam asks</b>
<ul>
<li>"interact with AWS services from application code (Python, Java…)" → <b>AWS SDK</b></li>
<li>"manage AWS services from a terminal / shell script / scheduled job, no programming language" → <b>AWS CLI</b></li>
<li>"web-based interface", "one-time task, visual interface" → <b>AWS Management Console</b></li>
<li>"check alarms, AWS Health events, resource status from a smartphone" → <b>AWS Console Mobile Application</b></li>
<li>What do the Console, CLI, and SDKs have in common? → they all <b>call AWS service APIs</b>; SDKs exist for many languages and take care of <b>request signing, retries, and error handling</b></li>
<li>"remove all resources and later rebuild exactly, least effort" → <b>delete the CloudFormation stack, then recreate it from the template</b></li>
<li>"provision resources in a repeatable way by using templates", "infrastructure as code" → <b>AWS CloudFormation</b></li>
<li>"upload code, AWS handles deployment, capacity provisioning, load balancing, auto scaling" → <b>AWS Elastic Beanstalk</b></li>
<li>"connects on-premises infrastructure with cloud resources" → <b>hybrid deployment</b></li>
<li>"patch and manage a fleet of EC2 and on-premises servers" → <b>AWS Systems Manager</b></li>
</ul>
</div>
`,summary:["Every operation on AWS ultimately becomes an API call.","Console = clicking in a web page (plus the Console Mobile Application for phones); CLI = typing commands and writing scripts; SDK = calling AWS from application code, with request signing and retries handled for you.","Use the Console for one-time tasks; automate tasks that repeat.","CloudFormation = Infrastructure as Code: a template (JSON/YAML) creates a stack of resources, repeatably and consistently.","Elastic Beanstalk = PaaS: upload your code, and AWS handles deployment, scaling, and load balancing.","Three deployment models: cloud, hybrid, on-premises; Systems Manager manages both AWS and on-premises servers."],terms:[["API (Application Programming Interface)","a set of standard commands one system exposes for others to call"],["AWS Management Console","the AWS web-based control panel"],["AWS Console Mobile Application","a mobile app for quickly viewing and managing resources"],["AWS CLI (Command Line Interface)","a tool for controlling AWS with typed commands"],["AWS SDK (Software Development Kit)","libraries for calling AWS from application code"],["Script","a file of commands that runs automatically"],["Infrastructure as Code (IaC)","describing infrastructure in a file so a tool can build it"],["Template","a blueprint file that describes infrastructure"],["Stack","a group of resources created by CloudFormation"],["PaaS (Platform as a Service)","you bring the code; the provider runs the platform beneath it"],["Repeatable process","a process that can be run again the same way"],["Deployment model","where your systems run: cloud, hybrid, or on-premises"],["Hybrid","a mix of on-premises and cloud, connected together"],["On-premises","on site, on the company's own infrastructure"],["Patch","a software fix or update"]]};
L.course["3-3"]={title:"Amazon EC2: virtual servers",goals:["Understand what a server and a virtual machine are, and what EC2 provides","Know what an AMI is for and how to choose an instance type from the 5 families","Tell an EBS root volume from an instance store, and understand that a security group is attached to an instance","Know that Amazon Lightsail is a simpler alternative to EC2"],html:`
<h3>What are servers and virtual machines?</h3>
<p>A <b>server</b> is a computer dedicated to "serving" other computers: hosting a website, processing orders, returning data when someone asks for it. At heart it has a CPU (processor), RAM (memory), disks, and a network card just like your own computer; it is simply more powerful and runs day and night.</p>
<p>A physical server is usually very powerful, so using it for just one job is wasteful. That is why software called a <b>hypervisor</b> is used to split one physical machine into many <b>virtual machines</b> (VMs). Each virtual machine has its own operating system and its own disk, and behaves like an independent computer.</p>

<div class="box idea"><b>🧠 In plain terms</b>
<p>A physical server is like an apartment building. The hypervisor is like dividing the building into many apartments. Each apartment (virtual machine) has its own locked door and its own power and water, and the people in one apartment can't get into another. Renting EC2 is like renting an apartment: you pick the size and move right in, with no need to build a house.</p>
</div>

<h3>What is Amazon EC2?</h3>
<p><b>Amazon EC2</b> (Elastic Compute Cloud) lets you rent virtual servers on AWS. Each virtual machine is called an <b>instance</b>. You can create an instance in a few minutes, run it for as long as you like, then stop it or delete it for good (terminate) when you no longer need it, and you pay only for the time you use. Note: once an instance is <b>stopped</b> you are no longer charged for compute, but the attached <b>EBS</b> volume still incurs storage charges until you delete it.</p>
<p>EC2 is the classic example of <b>IaaS</b> (Infrastructure as a Service). AWS takes care of the hardware, power, network, and buildings. You take care of everything from the operating system up: installing software, patching the operating system, configuring the firewall, protecting your data. That is the customer's part of the shared responsibility model.</p>
<p>The steps to create an instance, in brief:</p>
<div class="flow"><span>Choose an AMI</span><span>Choose an instance type</span><span>Choose network + security group</span><span>Attach storage</span><span>Launch</span></div>

<h3>AMI: a "ready-made installation"</h3>
<p>An <b>AMI</b> (Amazon Machine Image) is the template used to create an instance: it includes the operating system (Amazon Linux, Ubuntu, Windows Server…) and can come with software and configuration already in place. From one AMI you can create as many identical instances as you like.</p>
<p>AMIs come from three sources: provided by AWS, bought or obtained from <b>AWS Marketplace</b> (from software vendors), or <b>created by you</b> from an instance you have finished setting up.</p>

<div class="box example"><b>🍰 Example: BanhNgon Bakery</b>
<p>Minh creates an Amazon Linux instance, installs the web software and the BanhNgon website code, and tunes it until it runs well. He then creates his own AMI from this instance and names it "banhngon-web-v1". Whenever more servers are needed (Mid-Autumn Festival season, Black Friday), he just launches from that AMI and immediately has a server with everything already installed, with no need to set it up from scratch.</p>
</div>

<h3>Instance type: choosing the machine's "specs"</h3>
<p>The <b>instance type</b> determines how powerful the virtual machine is: how many vCPUs, how much RAM, how fast the network. Names look like <code>t3.micro</code> or <code>m5.large</code>: the first letter is the family, the number is the generation, and the part after the dot is the size. You don't need to memorize the names, but you must remember the <b>5 families</b> and what each one is good at:</p>
<table>
<tr><th>Family</th><th>Example letters</th><th>Strength</th><th>Used for</th></tr>
<tr><td><b>General purpose</b> (all-rounder)</td><td>T, M</td><td>A balance of CPU, RAM, and network</td><td>Web servers, small and medium applications, test environments. The <b>T</b> family is <b>burstable</b>: it normally runs light, and when a short surge arrives it temporarily "bursts" to higher speed, which suits low-traffic applications with occasional spikes</td></tr>
<tr><td><b>Compute optimized</b> (built for processing power)</td><td>C</td><td>Strong CPU relative to RAM</td><td>Batch processing, video encoding (transcoding), game servers, scientific simulation, high-performance web servers</td></tr>
<tr><td><b>Memory optimized</b> (built for lots of RAM)</td><td>R, X</td><td>Very large RAM</td><td>In-memory databases, real-time processing of large datasets</td></tr>
<tr><td><b>Storage optimized</b> (built for fast local disks)</td><td>I, D</td><td><b>Locally attached</b> disks (instance store) with extremely fast random reads/writes and very high IOPS</td><td>Data warehouses, self-managed NoSQL databases, distributed file systems</td></tr>
<tr><td><b>Accelerated computing</b> (hardware accelerators)</td><td>P, G, Inf, Trn</td><td>Has <b>GPUs</b> or specialized chips for massively parallel computation</td><td>Deep learning/machine learning training, graphics processing, scientific computing</td></tr>
</table>
<p><b>IOPS</b> (Input/Output Operations Per Second) is the number of disk reads/writes per second; the higher it is, the "quicker" the disk. You don't need to memorize the family letters, but if a question says "for example, C instances" or "P instances", you will recognize the family right away.</p>
<p>Picking the wrong size is not a problem: you can stop the instance, switch to a different type, and start it again. If you're not sure, <b>AWS Compute Optimizer</b> uses machine learning to recommend a better-fitting instance type based on actual usage (rightsizing).</p>

<div class="box trap"><b>⚠️ Common trap</b>
<p>"In-memory database", "large datasets in memory" → <b>Memory optimized</b>, not Storage optimized. "High, low-latency random read/write IOPS on locally attached disks" → <b>Storage optimized</b>. "High performance computing", "batch processing", "video transcoding", "CPU-bound, little memory" → <b>Compute optimized</b>. "Deep learning training", "GPU", "massively parallel", "graphics" → <b>Accelerated computing</b>. "Balanced, low traffic with short spikes" → <b>General purpose (burstable T)</b>.</p>
</div>

<h3>An instance's disks and firewall</h3>
<h4>EBS root volume and instance store</h4>
<p>Every instance needs a disk to hold the operating system, called the <b>root volume</b>. This is usually an <b>Amazon EBS</b> (Elastic Block Store) volume: a network disk, separate from the physical server, so the data is still there when you stop the instance. Note: by default, when you terminate (permanently delete) an instance the EBS root volume is deleted too, but you can change this setting.</p>
<p>Some instance types also have an <b>instance store</b>: disks attached directly to the physical server, very fast but <b>temporary</b>. When the instance is stopped or terminated, or the hardware fails, the data on the instance store is lost. Use it only for temporary data such as caches and scratch files. Lesson 3-7 covers storage in more detail.</p>
<h4>Security group</h4>
<p>Every instance has at least one <b>security group</b> attached: a virtual firewall at the instance level that defines which traffic may come in and go out. For example: allow only port 443 (HTTPS) from the internet to the web server. A security group has <b>allow</b> rules only, and it is <b>stateful</b>: once a request is allowed in, the response is automatically allowed out. This belongs to the security and networking topics; here you only need to know that it always comes with an instance.</p>

<h3>Amazon Lightsail and a word on pricing</h3>
<p>EC2 is very flexible but has so many options that beginners easily get confused. <b>Amazon Lightsail</b> is the simple version: you pick a ready-made "bundle" that includes a virtual machine, SSD storage, and a <b>data transfer allowance</b>, for a <b>fixed monthly price</b> that is low and predictable. It has one-click blueprints for <b>WordPress</b> and other popular applications. It suits blogs, small websites, test environments, and people with no cloud experience.</p>
<table>
<tr><th></th><th>Amazon EC2</th><th>Amazon Lightsail</th></tr>
<tr><td>Choices</td><td>A huge range: hundreds of instance types, with networking and storage you configure yourself</td><td>A few fixed bundles, with storage and data transfer included</td></tr>
<tr><td>Price</td><td>Per second/hour, with several purchasing models</td><td>An all-in monthly price</td></tr>
<tr><td>Best for</td><td>Applications that need flexibility, scaling, and control</td><td>Small websites, WordPress, beginners</td></tr>
</table>
<p>On EC2 pricing: there are several ways to buy, such as On-Demand, Reserved Instances, Savings Plans, Spot Instances, and Dedicated Hosts. That belongs to <b>Domain 4</b> and is covered in a later lesson. For now just remember: by default you pay for the time the instance runs, with nothing paid upfront.</p>

<div class="box exam"><b>🎯 What the exam asks</b>
<ul>
<li>"resizable compute capacity in the cloud", "virtual servers" → <b>Amazon EC2</b>; EC2 is an example of <b>IaaS</b></li>
<li>"template that contains the OS and software to launch an instance" → <b>AMI</b></li>
<li>"memory-intensive workloads, in-memory databases" → <b>Memory optimized</b></li>
<li>"temporary block storage physically attached to the host" → <b>instance store</b></li>
<li>"virtual firewall for an EC2 instance" → <b>security group</b></li>
<li>"simple virtual private server with a predictable monthly price", "WordPress for a beginner, storage and data transfer included" → <b>Amazon Lightsail</b></li>
<li>"CPU-bound batch, video transcoding" → <b>Compute optimized</b>; "deep learning training, GPU" → <b>Accelerated computing</b>; "very high local IOPS" → <b>Storage optimized</b></li>
<li>"recommend optimal EC2 instance types" → <b>AWS Compute Optimizer</b></li>
</ul>
</div>
`,summary:["A virtual machine is an independent computer carved out of a physical server; EC2 rents out virtual machines (instances) and you pay for the time you use.","EC2 is IaaS: the customer handles the operating system, patching, software, and security group configuration.","AMI = a template containing the operating system + software used to create instances; you can create your own AMI.","5 instance families: general purpose (burstable T, M), compute optimized (C), memory optimized (R, X), storage optimized (I, D: high local IOPS), accelerated computing (P, G: GPUs for ML).","The root volume is usually EBS (durable, kept when you stop); instance store is fast but loses its data on stop/terminate.","Lightsail = simple virtual machines at a fixed monthly price; EC2 pricing models are covered in Domain 4."],terms:[["Server","a computer that serves many users over a network"],["Virtual machine (VM)","a software-defined computer running on a physical server"],["Hypervisor","software that splits one physical machine into many virtual machines"],["Instance","one EC2 virtual machine"],["AMI (Amazon Machine Image)","a template used to create instances"],["Instance type","the size and hardware specs of an instance"],["General purpose","a balanced, all-round instance family"],["Compute optimized","an instance family with strong CPU power"],["Memory optimized","an instance family with very large RAM"],["Storage optimized","an instance family with very fast local disks"],["Accelerated computing","an instance family with GPUs or specialized chips"],["Burstable instance","an instance that can temporarily boost its CPU (T family)"],["IOPS","disk read/write operations per second"],["Amazon Lightsail","simple virtual servers at an all-in monthly price"],["Root volume","the main disk that holds the operating system"],["Instance store","temporary disk attached directly to the physical host"],["Security group","a virtual firewall at the instance level"],["Terminate","permanently delete an instance"]]};
L.course["3-4"]={title:"Containers and serverless: ECS, EKS, ECR, Fargate, Lambda, Batch",goals:["Understand what a container is and how it differs from a virtual machine","Tell Amazon ECS, Amazon EKS, Amazon ECR, and AWS Fargate apart","Understand serverless and how AWS Lambda works and is billed","Know when to choose EC2, containers, Lambda, or AWS Batch"],html:`
<h3>What is a container?</h3>
<p>Developers often complain: "It works on my machine, so why does it break on the server?" The reason is that the environments differ: software versions, libraries, configuration… each place is set up a little differently.</p>
<p>A <b>container</b> solves this by packaging the application <b>together with everything it needs</b> (libraries, configuration, tools) into one standard unit. That unit runs the same way anywhere: on a developer's laptop, on a company server, or on AWS. The most popular container tool is <b>Docker</b>.</p>
<p>The packaged "mold" is called a <b>container image</b>. When you run an image, you get a running container.</p>

<div class="box idea"><b>🧠 In plain terms</b>
<p>Think of <b>shipping containers</b> on a cargo ship. Before containers existed, each kind of cargo (wooden crates, sacks of rice, motorbikes) had to be loaded in its own way, which was very slow. A container has a standard size, can hold anything inside, and fits any ship, crane, or truck. Software containers are the same: standard packaging that runs wherever you move it.</p>
</div>

<h4>How does a container differ from a virtual machine?</h4>
<p>A virtual machine contains <b>an entire operating system of its own</b>, so it is heavy (several GB) and takes a few minutes to start. A container <b>shares the host's operating system kernel</b> and contains only the application and its libraries, so it is lightweight and starts in seconds. One server can run a great many containers.</p>
<table>
<tr><th></th><th>Virtual machine (VM)</th><th>Container</th></tr>
<tr><td>What it contains</td><td>A full operating system + the application</td><td>The application + libraries, sharing the operating system kernel</td></tr>
<tr><td>Size</td><td>Large</td><td>Small, lightweight</td></tr>
<tr><td>Startup</td><td>Usually a few minutes</td><td>Usually a few seconds</td></tr>
<tr><td>Example on AWS</td><td>Amazon EC2</td><td>Amazon ECS, Amazon EKS</td></tr>
</table>

<h3>Four container services to tell apart</h3>
<p>When you have dozens or hundreds of containers, you need a "coordinator" that decides which container runs on which machine and restarts any that fail. This is called <b>container orchestration</b>.</p>
<ul>
<li><b>Amazon ECS</b> (Elastic Container Service): a container orchestration service built by AWS itself; simple and deeply integrated with AWS.</li>
<li><b>Amazon EKS</b> (Elastic Kubernetes Service): runs <b>Kubernetes</b> (a very popular open-source container orchestration system) managed by AWS. Choose EKS when the company already uses Kubernetes or wants the same tooling it uses elsewhere.</li>
<li><b>Amazon ECR</b> (Elastic Container Registry): a "warehouse" for storing and managing <b>container images</b>. ECS and EKS pull images from here to run them.</li>
<li><b>AWS Fargate</b>: a <b>serverless</b> way to run containers. Normally ECS/EKS needs a group of EC2 machines to run containers on, and you have to manage them yourself. With Fargate, you just say "this container needs this much CPU and RAM", and AWS takes care of the servers. Fargate works with both ECS and EKS.</li>
</ul>
<div class="flow"><span>Package the app as an image</span><span>Store the image in ECR</span><span>ECS or EKS orchestrates</span><span>Run on EC2 or Fargate</span></div>
<h4>ECS on EC2 or on Fargate?</h4>
<p>Containers have to run on a "machine" of some kind. With ECS, you choose one of the two <b>launch types</b> below; EKS has two similar options (EC2 nodes or Fargate):</p>
<table>
<tr><th></th><th>EC2 launch type</th><th>Fargate launch type</th></tr>
<tr><td>Machines running the containers</td><td><b>Your own</b> EC2 instances, which you can see and log in to</td><td>AWS handles it; you never see the servers</td></tr>
<tr><td>What you look after</td><td>Choosing instance types, patching the operating system, scaling the number of machines in the cluster</td><td>Only declaring CPU and RAM for the container</td></tr>
<tr><td>Choose when</td><td>You need to pick exact instance types (e.g., GPU), install <b>monitoring/security agents on every host</b>, or have deep control</td><td>You want the least operational overhead</td></tr>
</table>

<div class="box trap"><b>⚠️ Common trap</b>
<p>ECR <b>does not run</b> containers; it only <b>stores images</b>. "Kubernetes" in a question → always <b>EKS</b>. "Run containers without managing servers / EC2 instances" → <b>Fargate</b>, not plain ECS or EKS.</p>
</div>

<h3>Serverless and AWS Lambda</h3>
<p><b>Serverless</b> does not mean there are no servers. The servers still exist, but <b>you never have to see or manage them</b>: no choosing specs, no patching the operating system, no worrying about scaling. You look after the code only, and you usually pay only when the code actually runs.</p>
<p><b>AWS Lambda</b> is the best-known serverless service. You write a small piece of code called a <b>function</b> and say "when it should run". Lambda is <b>event-driven</b>: when an event happens, the function runs. Example events: a file is uploaded to S3, a request arrives from an API, a message lands in a queue, or a scheduled time comes around.</p>
<ul>
<li><b>Billing</b>: based on the <b>number of invocations (requests)</b> and the function's <b>run time (duration)</b>, together with the amount of memory you allocate. If it doesn't run, it costs almost nothing.</li>
<li><b>Automatic scaling</b>: whether there is 1 event or 1,000 events at once, Lambda runs as many copies as needed.</li>
<li><b>An important limit</b>: each run lasts at most <b>15 minutes</b>. Longer jobs are not a good fit for Lambda.</li>
<li><b>Your responsibility</b>: securing the code and granting IAM permissions to the function. AWS takes care of the infrastructure, operating system, and runtime.</li>
</ul>
<p>Lambda is not the only serverless service. Others also mean "no servers to manage, scales automatically": <b>AWS Fargate</b>, <b>Amazon DynamoDB</b> (a NoSQL database), <b>Amazon S3</b>, <b>Amazon SQS</b>, <b>Amazon SNS</b>, <b>Amazon API Gateway</b>, <b>Amazon Aurora Serverless</b>. By contrast, <b>Amazon EC2</b> and standard <b>Amazon RDS</b> (where you choose an instance) are <b>not</b> serverless.</p>

<div class="box example"><b>🍰 Example: BanhNgon Bakery</b>
<p>Customers ordering birthday cakes often upload a photo to be printed on top of the cake. The original photos are very large. Minh writes a Lambda function: every time a new photo is uploaded to S3 (the event), the function automatically shrinks the photo and saves the smaller version. If there are 30 photos in a day, it runs 30 times, a few seconds each; Lan pays for exactly that much, instead of keeping a server running day and night.</p>
<p>As for the new ordering app, Minh's team packages it as a container, pushes the image to ECR, and runs it with ECS on Fargate so they don't have to manage EC2 machines.</p>
</div>

<h3>AWS Batch and how to choose a compute service</h3>
<p><b>AWS Batch</b> is for running <b>batch jobs</b> (work processed in bulk): hundreds or thousands of background computing tasks, such as processing a whole month of data, rendering, or simulations. You submit jobs to a queue, and Batch picks the right type and number of machines (it can use EC2, Spot, or Fargate), then releases them when the work is done. Unlike Lambda, Batch jobs can run longer than 15 minutes.</p>
<table>
<tr><th>Option</th><th>You manage</th><th>Best when</th></tr>
<tr><td><b>Amazon EC2</b></td><td>Operating system, software, scaling</td><td>You need full control of the server, specialized software, long-running workloads</td></tr>
<tr><td><b>ECS / EKS on EC2</b></td><td>Containers and the EC2 cluster</td><td>The application is already containerized and you want control of the machines underneath</td></tr>
<tr><td><b>ECS / EKS on Fargate</b></td><td>Containers only</td><td>You want to run containers without managing servers</td></tr>
<tr><td><b>AWS Lambda</b></td><td>Code only</td><td>Short tasks (up to 15 minutes), event-driven, unpredictable traffic</td></tr>
<tr><td><b>AWS Batch</b></td><td>Job definitions</td><td>A very large number of batch computing tasks that may run for a long time</td></tr>
</table>

<div class="box exam"><b>🎯 What the exam asks</b>
<ul>
<li>"run code without provisioning or managing servers, pay only for compute time" → <b>AWS Lambda</b></li>
<li>"run containers without managing servers or clusters of EC2 instances" → <b>AWS Fargate</b></li>
<li>"store and manage Docker container images" → <b>Amazon ECR</b></li>
<li>"Kubernetes" → <b>Amazon EKS</b>; "run and scale containers on AWS" (no mention of Kubernetes) → usually <b>Amazon ECS</b></li>
<li>"hundreds of thousands of batch computing jobs" → <b>AWS Batch</b></li>
<li>A task that runs longer than 15 minutes (e.g., a 3-hour job) → do <b>not</b> choose Lambda</li>
<li>"create a thumbnail each time a photo is uploaded to S3, long idle periods" → <b>Lambda + S3 event notification</b></li>
<li>"containers, no instance types, no patching, no cluster scaling" → <b>ECS with the Fargate launch type</b>; "agent on every host, choose exact instance types" → <b>ECS with the EC2 launch type</b></li>
<li>"which services are serverless" → Lambda, Fargate, DynamoDB, S3, SQS, SNS… (not EC2)</li>
<li>Lambda: the customer is responsible for the function's <b>code and IAM permissions</b></li>
</ul>
</div>
`,summary:["A container packages an application with its libraries and runs the same everywhere; it is lighter and starts faster than a virtual machine.","ECS = AWS's own container orchestration; EKS = managed Kubernetes; ECR = a registry for storing container images.","Fargate = serverless containers, usable with ECS and EKS; use the EC2 launch type when you need to pick instance types yourself or install agents on every host.","Serverless = no servers to manage; Lambda runs code in response to events, is billed by number of requests and duration, and runs for at most 15 minutes.","AWS Batch runs large numbers of batch jobs and provisions the right resources automatically.","Choose EC2 when you need full control; containers when the app is already packaged; Lambda for short, event-driven tasks."],terms:[["Container","a standard package of an application plus its libraries"],["Container image","the packaged template a container is started from"],["Docker","the most popular container tool"],["Container orchestration","coordinating where containers run and restarting failed ones"],["Kubernetes","popular open-source container orchestration software"],["Amazon ECS","AWS's own container orchestration service"],["Amazon EKS","managed Kubernetes service"],["Amazon ECR","a registry that stores container images"],["AWS Fargate","runs containers without managing servers"],["Serverless","servers exist but you never manage them"],["Function","a piece of code that runs on Lambda"],["Event-driven","runs in response to events"],["Batch job","work processed in bulk in the background"],["Launch type","how containers are run: on EC2 or on Fargate"]]};
L.course["3-5"]={title:"Scaling and load balancing: Auto Scaling, Elastic Load Balancing",goals:["Tell scale up (a bigger machine) apart from scale out (more machines)","Understand how Amazon EC2 Auto Scaling delivers elasticity","Understand how Elastic Load Balancing spreads traffic and runs health checks","See how Auto Scaling, ELB and multi-AZ work together so an application both handles load and stays highly available"],html:`
<h3>The problem: traffic goes up and down</h3>
<p>No website gets steady traffic. Nights are quiet, lunchtime is busy, and holidays can be ten times busier. If you prepare servers for the busiest day, they sit idle most of the time and waste money. If you prepare too few, the website crashes on the busy day.</p>
<p>The cloud solves this with two ideas: <b>scaling</b> (growing and shrinking capacity) and <b>load balancing</b> (spreading the traffic).</p>

<h3>Scale up and scale out</h3>
<ul>
<li><b>Scale up</b> / <b>vertical scaling</b>: replace the current machine with a <b>more powerful</b> one (more CPU, more RAM). It is simple, but it has a limit (even the biggest machine has a ceiling), you usually have to stop briefly to switch, and you still have only one machine: if it fails, everything is down.</li>
<li><b>Scale out</b> / <b>horizontal scaling</b>: <b>add more machines</b> running side by side. There is almost no limit, and if one machine fails the others keep running. The opposite is <b>scale in</b>: removing machines when traffic is low.</li>
</ul>

<div class="box idea"><b>🧠 In plain terms</b>
<p>A bakery is packed with customers. Scaling up is replacing the cashier with one super-fast cashier: there is a limit, and if that person is off sick the shop is paralyzed. Scaling out is opening more checkout counters: 5 counters when it is busy, 1 counter when it is quiet. The <b>load balancer</b> is the person at the door saying "counter 3 is free, please go there", and if a counter closes, they stop sending customers to it.</p>
</div>

<h3>Amazon EC2 Auto Scaling</h3>
<p><b>Amazon EC2 Auto Scaling</b> automatically <b>adds instances when load goes up and removes instances when load goes down</b>. This is <b>elasticity</b>, a core benefit of the cloud: you use and pay for exactly the resources you need at that moment, with no need to guess capacity in advance (stop guessing capacity).</p>
<p>You create an <b>Auto Scaling group</b> (a group of instances that scales automatically) and set three numbers:</p>
<ul>
<li><b>Minimum</b>: there are always at least this many instances, even when it is quiet.</li>
<li><b>Desired</b>: the number of instances that should be running right now.</li>
<li><b>Maximum</b>: never go above this, to keep costs under control.</li>
</ul>
<p>Then you set the scaling rules:</p>
<ul>
<li><b>Dynamic scaling</b>, for example <b>target tracking</b>: "keep average CPU around 50%". It reacts <b>after</b> the load has already gone up.</li>
<li><b>Scheduled scaling</b>: "every Friday at 19:00, go up to 6 machines". It suits peaks whose <b>time is known in advance</b>. Because a new instance needs a few minutes to be ready, a schedule makes sure there are enough machines <b>before</b> the customers rush in.</li>
<li><b>Predictive scaling</b>: uses machine learning on past load to add machines ahead of recurring cycles.</li>
</ul>
<p>Auto Scaling also plays a <b>self-healing</b> role: if an instance fails, it replaces it with a new one to keep the desired number of instances. New instances are usually created from a <b>launch template</b> that specifies the AMI, instance type, security group and so on.</p>
<p>A technical note: <b>by default</b> Auto Scaling only uses <b>EC2 status checks</b> (is the machine running, is there a hardware fault). If you want Auto Scaling to also replace instances that the load balancer reports as unhealthy (for example, the application is frozen but the machine is still running), you must <b>turn on ELB health checks</b> for the Auto Scaling group.</p>
<p>Recovering from failure automatically and adjusting capacity to demand are design principles of the <b>Reliability</b> pillar in the Well-Architected Framework (lesson 1-4): "automatically recover from failure", "stop guessing capacity", "scale horizontally". ELB + Auto Scaling spread across multiple AZs is how you put those principles into practice.</p>

<h3>Elastic Load Balancing</h3>
<p>When there are many instances, which one do visitors connect to? You need a single "front door" that distributes requests to the machines behind it. That is a <b>load balancer</b>. The AWS service is <b>Elastic Load Balancing (ELB)</b>, which AWS manages and which scales automatically with traffic.</p>
<p>ELB continuously runs <b>health checks</b>: it periodically "checks in" on each instance. An instance that does not answer correctly is considered unhealthy, and ELB stops sending visitors to it until it is healthy again.</p>
<p>The main types of load balancer:</p>
<table>
<tr><th>Type</th><th>Characteristics</th><th>Good for</th></tr>
<tr><td><b>Application Load Balancer</b> (ALB)</td><td>Understands HTTP/HTTPS content, can route by <b>URL path</b> (/api, /images) or domain name to different groups of machines</td><td>Websites, web applications, microservices</td></tr>
<tr><td><b>Network Load Balancer</b> (NLB)</td><td>Works at the TCP/UDP level (including custom protocols), handles <b>millions of requests per second</b>, ultra-low latency, can have a <b>static IP address</b></td><td>Games, financial trading, applications that need very high network performance, partners that need a fixed IP to open in their firewall</td></tr>
<tr><td><b>Gateway Load Balancer</b> (GWLB)</td><td>Passes traffic <b>transparently</b> through a fleet of <b>third-party virtual network appliances</b> (usually bought on AWS Marketplace), and helps that fleet scale and stay highly available</td><td>Firewalls, intrusion detection/prevention systems, packet inspection</td></tr>
</table>
<p>The core idea: ELB "automatically distributes traffic across multiple targets (EC2, containers, IP addresses, Lambda), in one or more AZs". Recent exams also ask you to pick the <b>right type</b> of load balancer from the keywords in the table above, so remember all three.</p>

<h3>Putting it together: Auto Scaling + ELB + multi-AZ</h3>
<p>These three usually go together as a standard architecture:</p>
<div class="flow"><span>Customers</span><span>Elastic Load Balancer</span><span>Auto Scaling group spread across AZ-a and AZ-b</span><span>EC2 instances</span></div>
<ul>
<li><b>ELB</b> is the single front door, spreading visitors evenly across the healthy instances.</li>
<li><b>Auto Scaling</b> adds/removes instances based on load, and registers new instances with ELB automatically.</li>
<li><b>Multi-AZ</b>: the Auto Scaling group is spread across multiple AZs. If one AZ has an outage, ELB sends all visitors to the remaining AZ, and Auto Scaling adds instances in the healthy AZ to make up for the loss.</li>
</ul>
<p>The result: <b>scalable</b> (handles growing load), <b>elastic</b> (grows and shrinks automatically) and <b>highly available</b> (keeps running through failures).</p>

<div class="box example"><b>🍰 Example: BanhNgon Bakery</b>
<p>Last year, BanhNgon ran a Black Friday sale. The website had only 1 server; at 8 p.m. customers rushed in and the website froze solid. Lan lost a whole night of revenue.</p>
<p>This year Minh rebuilt it: an Application Load Balancer in front, and behind it an Auto Scaling group spread across 2 AZs, min 2, max 10 instances, with the rule "keep CPU around 50%". On Black Friday night, CPU spiked, Auto Scaling grew to 8 instances on its own, and ELB spread the customers evenly. In the middle of the night one instance failed; the health check caught it, ELB stopped sending customers to it, and Auto Scaling replaced it with a new machine. The next morning traffic was low and the system shrank back to 2 instances by itself. Lan only paid for the few hours that 8 machines were running.</p>
</div>

<div class="box trap"><b>⚠️ Common trap</b>
<p><b>Auto Scaling</b> changes the <b>number</b> of instances (adds machines, removes machines, replaces failed ones). <b>ELB</b> <b>distributes traffic</b> and runs health checks, but <b>it does not create new instances by itself</b>. The two services are often swapped in the answer options. Also, tell <b>scalability</b> (the ability to grow to handle a large load) apart from <b>elasticity</b> (automatically growing and shrinking with actual demand); when a question says "automatically acquire and release resources", it is <b>elasticity</b>.</p>
</div>

<div class="box exam"><b>🎯 What the exam asks</b>
<ul>
<li>"automatically add EC2 instances during peak hours and remove them when traffic decreases" → <b>Amazon EC2 Auto Scaling</b></li>
<li>"automatically distributes incoming traffic across multiple EC2 instances" → <b>Elastic Load Balancing</b></li>
<li>"route traffic only to healthy instances" → ELB <b>health checks</b>; "replace instances that fail health checks" → <b>Auto Scaling</b></li>
<li>"predictable peak at a fixed time, add capacity before it" → <b>scheduled scaling</b></li>
<li>"route by URL path (/api, /images)", HTTP/HTTPS → <b>Application Load Balancer</b></li>
<li>"custom TCP protocol, millions of requests per second, static IP" → <b>Network Load Balancer</b></li>
<li>"third-party firewall / virtual appliances, transparent, scale" → <b>Gateway Load Balancer</b></li>
<li>"acquire resources when demand increases and release when demand decreases" → <b>elasticity</b></li>
<li>"overprovisioning for peaks leaves resources idle" → the <b>stop guessing capacity</b> benefit</li>
<li>"keep running if one Availability Zone fails" → a <b>multi-AZ</b> deployment (high availability)</li>
</ul>
</div>
`,summary:["Scale up = switch to a more powerful machine (has a limit); scale out = add machines side by side (flexible, tolerates failures well).","EC2 Auto Scaling adds/removes instances based on load, keeps the count between min and max, and replaces failed instances automatically.","Elasticity = resources grow and shrink automatically with demand, and you pay only for what you use.","Elastic Load Balancing distributes traffic across multiple targets and uses health checks to send it only to healthy instances.","Scale with target tracking (dynamic), scheduled (peak at a known time) or predictive (forecast with ML).","Main types: Application (HTTP/HTTPS, routes by URL path), Network (TCP/UDP, millions of requests/second, static IP), Gateway (third-party security appliances).","ELB + Auto Scaling + multi-AZ = an architecture that is both elastic and highly available."],terms:[["Scale up / vertical scaling","growing by using a more powerful machine"],["Scale out / horizontal scaling","growing by adding more machines"],["Scale in","shrinking by removing machines"],["Elasticity","growing and shrinking automatically with demand"],["Scalability","the ability to grow to handle more load"],["Auto Scaling group","a group of instances that scales automatically"],["Launch template","a configuration template for creating new instances"],["Load balancer","a front door that spreads traffic across servers"],["Elastic Load Balancing (ELB)","the AWS load balancing service"],["Health check","a regular test of whether an instance is working"],["Application Load Balancer","a load balancer for HTTP/HTTPS"],["Network Load Balancer","a load balancer for TCP/UDP"],["Target tracking","a rule that keeps a metric at a target value"],["Scheduled scaling","scaling at times set in advance"],["Gateway Load Balancer","passes traffic through third-party virtual network appliances"]]};
L.course["3-6"]={title:"Object storage with Amazon S3",goals:["Tell the three kinds of storage apart: object, block, file","Understand buckets, objects, 11 nines of durability and the typical uses of S3","Pick the right S3 storage class based on access frequency and retrieval speed","Know lifecycle policies, versioning and what affects S3 cost"],html:`
<h3>Three kinds of storage: object, block, file</h3>
<p>Before learning S3, you need to know that data can be stored in three different ways:</p>
<ul>
<li><b>Block storage</b>: data is split into small blocks on a disk, like the hard drive in a computer. The operating system attaches the disk and reads and writes directly, which is very fast. On AWS: <b>Amazon EBS</b>.</li>
<li><b>File storage</b>: data is organized into folders and files, and many machines can access it at the same time, like a shared network drive in an office. On AWS: <b>Amazon EFS</b>, <b>Amazon FSx</b>.</li>
<li><b>Object storage</b>: each file is an <b>object</b> made up of the data, <b>metadata</b> (descriptive information) and a unique key (name). You access it over the internet through an API, and capacity is virtually unlimited. On AWS: <b>Amazon S3</b>.</li>
</ul>

<div class="box idea"><b>🧠 In plain terms</b>
<p>Block storage is like the hard drive inside your computer. File storage is like the shared filing cabinet for a whole office: it has drawers and folders, and anyone can open it. Object storage is like a <b>coat-check service</b>: you hand over an item and get a ticket number back; to get it back, you show the number. The storeroom can hold countless items, and you do not need to know which shelf yours is on.</p>
</div>

<h3>Amazon S3: buckets and objects</h3>
<p><b>Amazon S3</b> (Simple Storage Service) is the AWS object storage service. Two basic concepts:</p>
<ul>
<li><b>Bucket</b>: the container that holds objects. <b>By default</b>, a bucket name must be <b>globally unique</b> (no two can be the same anywhere in the world), and a bucket is created in a Region you choose. (Since March 2026 S3 also offers an <i>account regional namespace</i> option: the bucket name carries the account ID and Region so nobody else can take the name. For the exam, the answer is still "globally unique".)</li>
<li><b>Object</b>: each file you store (photos, videos, backup files, documents…). Each object can be up to 50 TB (before December 2025 it was 5 TB — older material may show that number), and the number of objects in a bucket is unlimited. A single upload request (single PUT) can be at most <b>5 GB</b>; larger files must use <b>multipart upload</b> (split into parts that upload in parallel).</li>
</ul>
<p>S3 is famous for its <b>99.999999999%</b> durability (<b>11 nines</b>). Put simply: data you store is almost never lost, because S3 automatically copies it to multiple places. Note that <b>durability</b> (the data is not lost) is different from <b>availability</b> (you can access it right when you need it).</p>
<p>Typical uses:</p>
<ul>
<li><b>Static website hosting</b>: host a static website (HTML, images, CSS) with no server.</li>
<li><b>Backup and restore</b>: store backups and long-term archives.</li>
<li><b>Data lake</b>: pour every kind of data into one place to analyze later (for example, using Amazon Athena to run SQL queries directly on S3).</li>
<li>Storing images and videos for applications; acting as the origin for CloudFront content delivery.</li>
</ul>

<h3>Storage classes: pay for how you use it</h3>
<p>Not all data is opened often. S3 has several <b>storage classes</b>. The general rule: <b>the less you access it, the cheaper the storage price, but the higher the retrieval fee or the longer the wait</b>.</p>
<table>
<tr><th>Storage class</th><th>Characteristics</th><th>Use when</th></tr>
<tr><td><b>S3 Standard</b></td><td>The default, fast access, stored across multiple AZs</td><td>Frequently used data: product photos, websites</td></tr>
<tr><td><b>S3 Intelligent-Tiering</b></td><td>Automatically moves each object between tiers based on actual access; has a small monitoring fee per object, <b>no</b> retrieval fee, and needs no one to operate it</td><td>Access frequency is unknown or changing, with some data read often and some rarely</td></tr>
<tr><td><b>S3 Standard-IA</b> (Infrequent Access)</td><td>Cheaper than Standard, has a retrieval fee, stored across multiple AZs</td><td>Rarely used but needed immediately when you do need it: recent backups</td></tr>
<tr><td><b>S3 One Zone-IA</b></td><td>Like Standard-IA but stored in only <b>1 AZ</b>, cheaper</td><td>Rarely used and easy to recreate if lost: secondary copies, thumbnails</td></tr>
<tr><td><b>S3 Glacier Instant Retrieval</b></td><td>Long-term archive, retrieval in <b>milliseconds</b>, cheaper than Standard-IA when reads are very rare</td><td>Very rarely accessed (about once a quarter) but needed immediately: medical images, old record photos</td></tr>
<tr><td><b>S3 Glacier Flexible Retrieval</b></td><td>Retrieval from <b>a few minutes</b> (expedited, costs more) to <b>a few hours</b> (standard, bulk)</td><td>Archives and backups read 1-2 times a year, where waiting a few hours is usually fine and occasionally you need it urgently within minutes</td></tr>
<tr><td><b>S3 Glacier Deep Archive</b></td><td><b>The cheapest</b>, retrieval takes about <b>12–48 hours</b> (standard within 12 hours, bulk within 48 hours)</td><td>Kept for many years for compliance, almost never opened</td></tr>
</table>

<div class="box trap"><b>⚠️ Common trap</b>
<p>"Unknown or changing access patterns" → <b>Intelligent-Tiering</b>. "Lowest cost archive, retrieval within 12–48 hours is acceptable" → <b>Glacier Deep Archive</b>. "Infrequently accessed, can be recreated, lowest cost" → <b>One Zone-IA</b>. "Rarely accessed (once a quarter) but needs milliseconds" → <b>Glacier Instant Retrieval</b>. "Read once or twice a year, minutes for rare urgent cases, hours otherwise" → <b>Glacier Flexible Retrieval</b>. Remember that One Zone-IA lives in only 1 AZ; if that AZ suffers a disaster the data can be lost, so do not use it for the only copy of important data.</p>
</div>

<h3>Lifecycle policies and versioning</h3>
<h4>Lifecycle policy: automatic "moving between warehouses"</h4>
<p>An <b>S3 Lifecycle configuration</b> is a set of automatic rules with two kinds of actions: <b>transition</b> (after X days, move the object to a cheaper storage class) and <b>expiration</b> (after Y days, delete the object). You set it once and S3 keeps doing it forever, saving money without anyone having to remember.</p>
<div class="flow"><span>Day 0: S3 Standard</span><span>After 30 days: Standard-IA</span><span>After 90 days: Glacier Flexible Retrieval</span><span>After 5 years: delete</span></div>
<h4>Versioning: keeping the versions</h4>
<p>When you turn on <b>versioning</b> for a bucket, every time an object is overwritten S3 keeps the old version. When you delete, S3 only places a "delete marker", so the object can be restored. This is very useful against accidental deletes and overwrites. Versioning is also required for <b>replication</b> (automatic copying to another bucket, even one in another Region).</p>

<h3>Data protection and S3 features that often appear on the exam</h3>
<table>
<tr><th>Feature</th><th>What it does</th><th>Use when</th></tr>
<tr><td><b>S3 Versioning</b></td><td>Keeps every old version of an object</td><td>Protecting against accidental deletes and overwrites</td></tr>
<tr><td><b>MFA Delete</b></td><td>Requires an <b>MFA</b> (multi-factor authentication) code to permanently delete a version or turn off versioning. Versioning must be turned on first</td><td>Adding one more lock against accidental or malicious deletion</td></tr>
<tr><td><b>S3 Object Lock</b></td><td>Locks objects using the <b>WORM</b> model (write once, read many: written once, then read-only) for a retention period. Requires versioning</td><td>Records that must be kept unaltered by law (financial, legal)</td></tr>
<tr><td><b>Cross-Region Replication (CRR)</b> / <b>Same-Region Replication (SRR)</b></td><td>Automatically copies new objects to a bucket in <b>another Region</b> (CRR) or the same Region (SRR)</td><td>Compliance, disaster recovery, lower latency for users in another Region</td></tr>
<tr><td><b>S3 Transfer Acceleration</b></td><td>Faster uploads over long distances by entering at the nearest <b>edge location</b> and then traveling on the AWS private network</td><td>Users far from the bucket's Region uploading large files</td></tr>
<tr><td><b>Block Public Access</b> and default encryption</td><td>Blocks unintended public exposure of a bucket; new objects are encrypted automatically (SSE-S3)</td><td>Basic security, on by default for new buckets</td></tr>
</table>
<p>Object Lock has two modes: <b>governance mode</b> (users with special permission can still remove the lock) and <b>compliance mode</b> (<b>no one</b> can delete or change the object before the retention period ends, not even the account's root user). When a question says "no one, including the root user" → <b>compliance mode</b>.</p>

<div class="box example"><b>🍰 Example: BanhNgon Bakery</b>
<p>Minh uses S3 for many things. Product photos for the website live in <b>S3 Standard</b> because customers view them constantly. Daily database backups go into S3 with a lifecycle rule: after 30 days they move to <b>Standard-IA</b>, after 90 days to <b>Glacier Flexible Retrieval</b>. Invoices and accounting records that must be kept for many years by law go into <b>Glacier Deep Archive</b>, the cheapest class, because they are almost never opened.</p>
<p>Once, an employee accidentally uploaded the new price list over the old one. Because versioning was turned on for the bucket, Minh got the old version back in a minute.</p>
</div>

<h3>How is S3 cost calculated?</h3>
<p>The main factors that affect your S3 bill:</p>
<ul>
<li><b>The amount of data stored</b> (per GB per month) and the <b>storage class</b> you choose.</li>
<li><b>The number of requests</b> (read, write, list…) and retrieval fees for the IA/Glacier classes.</li>
<li><b>Data transfer out</b>: data going <b>out</b> to the internet (or to another Region) is charged.</li>
<li><b>Data transfer in</b>: data coming <b>into</b> S3 from the internet is <b>free</b>.</li>
</ul>
<p>You will learn the pricing details in Domain 4.</p>

<div class="box exam"><b>🎯 What the exam asks</b>
<ul>
<li>"object storage", "store and retrieve any amount of data", "static website" → <b>Amazon S3</b></li>
<li>"99.999999999% durability" → <b>Amazon S3</b> (11 nines)</li>
<li>"rarely accessed archive, retrieval within 12–48 hours acceptable, lowest cost" → <b>S3 Glacier Deep Archive</b></li>
<li>"unknown or changing access patterns" → <b>S3 Intelligent-Tiering</b></li>
<li>"move objects to Glacier after 90 days and delete after 5 years" → <b>S3 Lifecycle configuration</b></li>
<li>"protect against accidental deletion or overwrite" → <b>S3 Versioning</b> (+ <b>MFA Delete</b>)</li>
<li>"write-once-read-many (WORM)", "retention period" → <b>S3 Object Lock</b>; "no one, including root, can delete" → <b>compliance mode</b></li>
<li>"automatically copy every new object to a bucket in another Region" → <b>S3 Cross-Region Replication</b></li>
<li>"faster uploads from distant users over long distances" → <b>S3 Transfer Acceleration</b></li>
<li>"rarely accessed, millisecond retrieval, lowest cost" → <b>S3 Glacier Instant Retrieval</b></li>
<li>What can Lifecycle do? → <b>transition</b> to a cheaper class and <b>expire</b> (delete) after a set number of days</li>
<li>"factors that affect S3 cost" → <b>amount of data stored</b>, <b>requests</b>, <b>data transfer out</b> (data in is free)</li>
</ul>
</div>
`,summary:["Three kinds of storage: block (EBS), file (EFS, FSx), object (S3).","S3 stores objects in buckets; bucket names are globally unique, a bucket lives in one Region; 11 nines of durability.","S3 is used for static websites, backups, data lakes, and storing images/videos for applications.","Storage classes: Standard, Intelligent-Tiering, Standard-IA, One Zone-IA, Glacier Instant/Flexible Retrieval, Glacier Deep Archive (the cheapest).","A lifecycle policy automatically moves objects to a cheaper class (transition) or deletes them (expiration) over time; versioning keeps old versions and protects against accidental deletion.","Data protection: MFA Delete, Object Lock (WORM; in compliance mode not even root can delete), Cross-Region Replication; Transfer Acceleration speeds up uploads from far away.","S3 cost: storage amount, requests, data transfer out; data transfer in is free."],terms:[["Object storage","storing each file as an object with data, metadata and a key"],["Block storage","storing data as blocks on a disk, like a hard drive"],["File storage","storing data as shared folders and files"],["Bucket","a container for objects in S3"],["Object","a single file stored in S3"],["Metadata","information that describes the data"],["Durability","how well data is protected from being lost"],["Availability","being able to access data when you need it"],["Storage class","a pricing tier of S3 storage based on how data is accessed"],["Infrequent Access (IA)","for data that is not accessed often"],["Archive","long-term storage of rarely used data"],["Lifecycle configuration","rules that automatically move or delete objects over time"],["Versioning","keeping old versions of each object"],["Data lake","one central place holding all kinds of data for analysis"],["Data transfer out","data sent out of AWS to the internet or another Region"],["WORM (Write Once, Read Many)","written once, then read-only; cannot be changed or deleted"],["S3 Object Lock","locks objects as WORM for a retention period"],["MFA Delete","requires an MFA code to permanently delete an object version"],["Cross-Region Replication (CRR)","automatic copying of objects to another Region"],["S3 Transfer Acceleration","faster uploads to S3 through edge locations"]]};
L.course["3-7"]={title:"Disks, shared files, backup and disaster recovery",goals:["Understand Amazon EBS, snapshots and how they differ from instance store","Tell Amazon EFS (Linux, NFS) apart from Amazon FSx (Windows File Server and other file systems)","Know that AWS Storage Gateway is for hybrid setups","Know AWS Backup and AWS Elastic Disaster Recovery, and the basic disaster recovery strategies"],html:`
<h3>Amazon EBS: hard drives for virtual servers</h3>
<p>In the EC2 lesson, you learned that every instance needs a disk. <b>Amazon EBS</b> (Elastic Block Store) provides <b>block storage</b> disks that attach to EC2 over the network. Each EBS disk is called a <b>volume</b>.</p>
<ul>
<li>The data is <b>persistent</b>: it exists independently of the instance, stays intact when you stop the instance, and can be detached and attached to another instance.</li>
<li>A volume lives in <b>one AZ</b> and can only attach to an instance in that same AZ. AWS automatically replicates the volume within the AZ to protect against hardware failure.</li>
<li>Usually each volume attaches to one instance (some special types can attach to multiple instances, but that is not the common case).</li>
<li>There are several types: SSD for high speed, HDD for large, sequentially read data at a lower price.</li>
</ul>
<h4>EBS snapshot</h4>
<p>A <b>snapshot</b> is a backup of an EBS volume at a point in time, stored durably by AWS (on S3, managed by AWS). Snapshots are <b>incremental</b>: each later one saves only what changed, which saves money. From a snapshot you can create a new volume, even in a different AZ, and you can <b>copy a snapshot to another Region</b> to protect against disasters.</p>
<p>Because a volume cannot attach across AZs, to get data from AZ A to an instance in AZ B you: <b>create a snapshot → create a new volume from the snapshot in AZ B → attach it to the instance</b>.</p>

<div class="box idea"><b>🧠 In plain terms</b>
<p>An EBS volume is like an external hard drive: you can unplug it and plug it into another machine, and the data is still there when the machine is off. A snapshot is like taking a photo of that entire drive and putting it in a safe. <b>Instance store</b> is like the whiteboard in a meeting room: quick to write on, quick to erase, and wiped clean when the meeting ends (the instance stops).</p>
</div>

<h3>Instance store: fast but temporary</h3>
<p><b>Instance store</b> is disk storage physically attached to the host computer running the instance. Because it sits right on the machine, it is very fast. But the data is <b>ephemeral</b> (temporary): it is lost when the instance is stopped or terminated, or when the underlying hardware fails (it survives a reboot). Use it only for caches, temporary files, or data that already has a copy elsewhere.</p>

<h3>Shared files: Amazon EFS and Amazon FSx</h3>
<p>Sometimes many servers need to read and write <b>the same folder</b> at the same time, for example several web servers sharing one image library. EBS usually attaches to just one machine, so you need shared <b>file storage</b>.</p>
<ul>
<li><b>Amazon EFS</b> (Elastic File System): a shared file system for <b>Linux</b> machines, using the <b>NFS</b> protocol. Thousands of instances (across multiple AZs) can access it at the same time. Capacity <b>grows and shrinks automatically</b> with the amount of files, with nothing to provision in advance, and you pay for the storage you actually use.</li>
<li><b>Amazon FSx</b>: a family of fully managed file system services built on popular file systems that businesses already use (see the table).</li>
</ul>
<table>
<tr><th>FSx variant</th><th>Protocol / characteristics</th><th>Choose when</th></tr>
<tr><td><b>FSx for Windows File Server</b></td><td><b>SMB</b>, integrates with Active Directory</td><td><b>Windows</b> applications need shared folders</td></tr>
<tr><td><b>FSx for Lustre</b> (<i>out of scope for the exam, shown only for comparison</i>)</td><td>Sub-millisecond latency, throughput of hundreds of GB/second, <b>links directly to data in S3</b></td><td><b>HPC</b>, simulations, machine learning training</td></tr>
<tr><td><b>FSx for NetApp ONTAP</b></td><td>Multi-protocol: <b>NFS and SMB</b> (and iSCSI) on the same data; snapshots, deduplication (removing duplicate data), compression</td><td>Replacing on-premises <b>NetApp</b> storage appliances; Linux and Windows machines sharing the same data</td></tr>
<tr><td><b>FSx for OpenZFS</b></td><td>NFS, the ZFS file system</td><td>Moving systems that use ZFS/Linux to AWS</td></tr>
</table>

<div class="box trap"><b>⚠️ Common trap</b>
<p>"Linux", "NFS", "shared file system for many EC2 instances" → <b>EFS</b>. "Windows", "SMB", "Active Directory" → <b>FSx for Windows File Server</b>. "High performance computing", "data in S3" → FSx for Lustre (this service is on the out-of-scope list for CLF-C02; Amazon FSx in general is still in scope). "NetApp", "NFS and SMB on the same data" → <b>FSx for NetApp ONTAP</b>. "Block storage for one EC2 instance" → <b>EBS</b>. "Temporary storage physically attached to host" → <b>instance store</b>.</p>
</div>

<h3>Hybrid and centralized backup: Storage Gateway, AWS Backup</h3>
<h4>AWS Storage Gateway</h4>
<p>Many companies still have on-premises servers but want to use the virtually unlimited capacity of AWS. <b>AWS Storage Gateway</b> is a <b>hybrid cloud storage</b> service: you place a "gateway" (software or an appliance) in the office/data center, on-premises applications still see a familiar disk or folder, but the data is actually stored in AWS (such as S3). The gateway keeps a <b>local cache</b> so frequently used files still open fast at the office.</p>
<table>
<tr><th>Gateway type</th><th>What on-premises applications see</th><th>Data is stored in AWS as</th><th>Use when</th></tr>
<tr><td><b>S3 File Gateway</b></td><td>File shares over <b>NFS / SMB</b></td><td>Objects in <b>Amazon S3</b></td><td>Storing office files in S3 while keeping a local cache</td></tr>
<tr><td><b>Volume Gateway</b></td><td>Block disks (iSCSI)</td><td>Data on S3, can create EBS snapshots</td><td>Backing up on-premises server disks to the cloud</td></tr>
<tr><td><b>Tape Gateway</b></td><td>A <b>virtual tape library</b></td><td>Virtual tapes in S3, archived long term in S3 Glacier</td><td>Getting rid of physical tapes while <b>keeping the backup software</b> you already use</td></tr>
</table>
<h4>AWS Backup</h4>
<p>If every service is backed up in its own way, managing it all is exhausting. <b>AWS Backup</b> lets you <b>centrally manage and automate backups</b> across many services: EBS, EC2, RDS, Aurora, DynamoDB, EFS, FSx, S3, Storage Gateway… You create a <b>backup plan</b>: when to back up, how long to keep backups, and whether to <b>copy them to another Region</b> (cross-Region copy) or another account. Combined with AWS Organizations, you can apply backup policies to <b>multiple accounts</b>, and use <b>AWS Backup Audit Manager</b> to <b>report on backup compliance</b> from one place.</p>

<h3>Disaster recovery: AWS Elastic Disaster Recovery</h3>
<p><b>Disaster recovery</b> (DR) is the plan for getting a system running again after a major incident. Two metrics to know:</p>
<ul>
<li><b>RPO</b> (Recovery Point Objective): the maximum amount of data you can accept losing, measured in time (for example, at most 1 hour of data).</li>
<li><b>RTO</b> (Recovery Time Objective): how quickly recovery must be finished (for example, within 4 hours).</li>
</ul>
<p>DR strategies, from cheap and slow to expensive and fast: <b>backup and restore</b> (back up, then restore) → <b>pilot light</b> (keep a minimal core ready) → <b>warm standby</b> (a scaled-down copy always running) → <b>multi-site active/active</b> (running at full scale in multiple places at once).</p>
<p><b>AWS Elastic Disaster Recovery</b> (AWS DRS) continuously <b>replicates</b> servers (on premises, on another cloud, or EC2 in another Region) to AWS in a cost-effective form. When an incident happens, you launch the replicated machines on AWS within minutes, minimizing downtime and data loss.</p>

<div class="box example"><b>🍰 Example: BanhNgon Bakery</b>
<p>BanhNgon's system has grown fairly large. Each web server has a root EBS volume; Minh uses <b>AWS Backup</b> to take a snapshot every night, keep it for 30 days, and copy one to another Region. The web servers share an image library through <b>EFS</b>. The accounting team uses Windows machines, so their shared folder of accounting records lives on <b>FSx for Windows File Server</b>.</p>
<p>The shop's storeroom still has an old inventory management server that has not moved to the cloud. Minh installs <b>Storage Gateway</b> so its data is stored in S3, and uses <b>Elastic Disaster Recovery</b> to continuously replicate that server to AWS. If the storeroom loses power again like in the old days, Minh starts the copy on AWS within minutes.</p>
</div>

<h3>Summary comparison table</h3>
<table>
<tr><th>Service</th><th>Type</th><th>Key characteristics</th><th>Exam keywords</th></tr>
<tr><td>Amazon EBS</td><td>Block</td><td>Persistent disk for EC2, lives in 1 AZ, has snapshots</td><td>block storage for EC2</td></tr>
<tr><td>Instance store</td><td>Block</td><td>Physically attached to the host, very fast, temporary data</td><td>temporary, physically attached</td></tr>
<tr><td>Amazon EFS</td><td>File</td><td>Shared storage for Linux, NFS, scales automatically, multi-AZ</td><td>shared file system, Linux</td></tr>
<tr><td>Amazon FSx</td><td>File</td><td>Windows File Server (SMB), ONTAP, OpenZFS; Lustre (HPC, out of scope for the exam)</td><td>Windows, SMB, HPC</td></tr>
<tr><td>Amazon S3</td><td>Object</td><td>Unlimited capacity, 11 nines of durability</td><td>object storage</td></tr>
<tr><td>AWS Storage Gateway</td><td>Hybrid</td><td>On-premises applications use AWS storage</td><td>hybrid, on-premises access to cloud storage</td></tr>
<tr><td>AWS Backup</td><td>Backup management</td><td>Centralized, plan-based backups across many services</td><td>centrally manage backups</td></tr>
<tr><td>AWS Elastic Disaster Recovery</td><td>Disaster recovery</td><td>Continuous replication, fast recovery on AWS</td><td>minimize downtime and data loss</td></tr>
</table>

<div class="box exam"><b>🎯 What the exam asks</b>
<ul>
<li>"block-level storage volumes for EC2" → <b>Amazon EBS</b>; "point-in-time backup of EBS" → <b>EBS snapshot</b></li>
<li>"multiple Linux EC2 instances need shared, concurrent access" → <b>Amazon EFS</b></li>
<li>"shared file storage for Windows applications, SMB" → <b>Amazon FSx for Windows File Server</b></li>
<li>"on-premises applications access virtually unlimited cloud storage" → <b>AWS Storage Gateway</b></li>
<li>"NFS/SMB file shares on premises, store as objects in S3, local cache" → <b>S3 File Gateway</b>; "replace physical tapes, keep backup software" → <b>Tape Gateway</b></li>
<li>"replace NetApp, NFS + SMB, snapshots, deduplication" → <b>FSx for NetApp ONTAP</b></li>
<li>"copy an EBS volume to another AZ" → <b>take a snapshot, then create a new volume in that AZ</b>; where are snapshots stored? → <b>in S3, managed by AWS</b></li>
<li>"centrally manage and automate backups across AWS services", "multiple accounts, cross-Region copy, compliance reporting" → <b>AWS Backup</b></li>
<li>"continuously replicate servers to AWS to minimize downtime and data loss" → <b>AWS Elastic Disaster Recovery</b></li>
</ul>
</div>
`,summary:["EBS = persistent block disks for EC2, living in one AZ; a snapshot is an incremental backup that can be copied to another Region.","Instance store = disk physically attached to the host, very fast, data is lost on stop/terminate.","EFS = shared files for Linux (NFS), scales automatically; FSx = Windows File Server (SMB), Lustre (HPC, out of scope for the exam), NetApp ONTAP (NFS + SMB, snapshots, dedup), OpenZFS.","Storage Gateway = hybrid storage: S3 File Gateway (NFS/SMB → S3, with a cache), Volume Gateway (block disks), Tape Gateway (virtual tapes).","AWS Backup = centralized, plan-based backups across many services and accounts, with cross-Region copy and compliance reporting.","Elastic Disaster Recovery continuously replicates servers to AWS for fast recovery; RPO = how much data you can accept losing, RTO = how long recovery may take."],terms:[["Volume","one EBS disk"],["Snapshot","a backup of a disk at a point in time"],["Incremental","saving only what changed since last time"],["Ephemeral","temporary; lost when the instance stops"],["NFS (Network File System)","a file-sharing protocol common on Linux"],["SMB (Server Message Block)","a file-sharing protocol common on Windows"],["Shared file system","a file system many machines can use at once"],["Hybrid cloud storage","on-premises systems using cloud storage"],["Tape Gateway","a virtual tape library that stores backup data in AWS"],["Local cache","a local copy of frequently used data kept at the office"],["Backup plan","rules for when to back up and how long to keep backups"],["Disaster recovery (DR)","getting systems running again after a major incident"],["RPO (Recovery Point Objective)","the maximum amount of data you can accept losing"],["RTO (Recovery Time Objective)","the maximum time allowed to recover"],["Pilot light","keeping a minimal core ready to go"],["Warm standby","a scaled-down copy that is always running"]]};
})();
