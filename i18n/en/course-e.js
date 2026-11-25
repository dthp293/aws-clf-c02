(function(){var I=window.CLF_I18N=window.CLF_I18N||{};var L=I.en=I.en||{};['q','course','lessons','glossary','services','domains','ui'].forEach(function(k){L[k]=L[k]||{};});
L.course["4-1"]={title:"Ways to buy EC2: On-Demand, Reserved, Savings Plans, Spot, Dedicated",goals:["Understand why the same EC2 server can be paid for in several different ways","Tell apart On-Demand, Reserved Instances, Savings Plans and Spot Instances","Tell apart Dedicated Instances, Dedicated Hosts and On-Demand Capacity Reservations","Pick the right purchasing option for each exam scenario"],html:`
<h3>Why are there so many ways to buy?</h3>
<p>A quick reminder: <b>Amazon EC2</b> (Elastic Compute Cloud, the virtual server rental service) lets you rent a "computer" that sits in an AWS data center. Each of these machines is called an <b>instance</b> (a virtual server).</p>
<p>The machines are the same, but the <b>way you pay</b> is different. AWS lets you choose: pay a higher price but stay flexible, or commit to long-term use to get a discount, or accept that the machine can be "taken back" in exchange for a very low price. These choices are called <b>purchasing options</b>.</p>
<div class="box idea"><b>🧠 In plain terms</b><p>Think about getting around:</p>
<ul>
<li><b>Calling a taxi</b>: you call one whenever you need it and pay for exactly what you ride. Convenient, but the most expensive per kilometer. That is <b>On-Demand</b>.</li>
<li><b>Renting a car by the month or year</b>: you sign a long contract, the daily price is much lower, but you still pay even when you don't drive. That is <b>Reserved Instances</b> and <b>Savings Plans</b>.</li>
<li><b>A standby plane ticket</b>: surprisingly cheap because you take an empty seat, but the airline may not let you board. That is <b>Spot Instances</b>.</li>
</ul></div>

<h3>On-Demand: pay for what you use, no commitment</h3>
<p><b>On-Demand Instances</b> are the default option. Billing starts when you start the instance and stops when you stop it. You are charged per second or per hour, depending on the instance type and operating system.</p>
<p>There is no contract, no upfront payment, and nobody takes the machine back. In exchange, this is the highest price among the common options.</p>
<p>A good fit when: the work is short-term, unpredictable, experimental, or it is a new application and you don't yet know how long it will run.</p>

<h3>Reserved Instances and Savings Plans: commit to get a discount</h3>
<h4>Reserved Instances (RI)</h4>
<p>With <b>Reserved Instances</b> you make a commitment to AWS: "I will use this type of machine for <b>1 year or 3 years</b>". In return, you get a discount of up to about <b>72%</b> compared with On-Demand. The longer the commitment, the bigger the discount.</p>
<p>There are two main types:</p>
<ul>
<li><b>Standard RI</b>: the biggest discount, but the least flexible. You cannot switch to a different instance family.</li>
<li><b>Convertible RI</b>: a smaller discount, but during the term you can exchange it for a different instance family or operating system.</li>
</ul>
<p>For how you pay, there are three payment options:</p>
<ul>
<li><b>All Upfront</b>: you pay everything at the start and get the biggest discount.</li>
<li><b>Partial Upfront</b>: you pay part at the start and the rest in monthly installments.</li>
<li><b>No Upfront</b>: you pay nothing at the start and pay monthly; this gives the smallest discount of the three. You still have to pay the full commitment.</li>
</ul>
<p>When you buy an RI, you choose its <b>scope</b>: a whole Region or a single AZ:</p>
<table>
<tr><th></th><th>Regional RI (scoped to a Region)</th><th>Zonal RI (tied to one AZ)</th></tr>
<tr><td>Discount applies to</td><td>Matching instances in <b>any AZ</b> in the Region</td><td>Only matching instances in the <b>exact AZ</b> you chose</td></tr>
<tr><td>Discount across sizes (<b>size flexibility</b>)</td><td>Yes (in many cases, for example Linux): the discount applies automatically to different sizes within the same instance family</td><td>No</td></tr>
<tr><td>Reserved capacity (<b>capacity reservation</b>)</td><td>No</td><td><b>Yes</b>, it reserves capacity in that AZ</td></tr>
</table>
<p>Three more points that are often tested:</p>
<ul>
<li>When you use <b>AWS Organizations</b> (central management of multiple AWS accounts, covered in detail in a later lesson), RI and Savings Plans discounts are <b>shared by default</b> with the other accounts in the organization if they run matching instances. Example: account A buys a Regional RI but shuts its instance down, and account B runs the same instance type in another AZ of the same Region → B automatically gets the discount.</li>
<li>Want the discount to apply only to the account that bought it (for example, to charge internal costs correctly to each subsidiary)? The <b>management account</b> (the account that manages the organization) can <b>turn off RI/Savings Plans sharing</b> (discount sharing) for individual accounts in the Billing settings.</li>
<li><b>Reserved Instance Marketplace</b> (a resale market for RIs): if you no longer need an RI, you can <b>sell the remaining term</b> to another AWS customer. Only <b>Standard RIs</b> can be sold here; <b>Convertible RIs cannot be sold</b> (in exchange, they can be converted to a different configuration).</li>
</ul>

<h4>Savings Plans</h4>
<p><b>Savings Plans</b> are also a 1-year or 3-year commitment, but you commit to an <b>amount of money per hour</b> (for example, "I will spend at least 10 USD/hour on compute"), not to a specific type of machine. Usage within the commitment is billed at the lower rate; anything above it is billed at the On-Demand rate.</p>
<table>
<tr><th></th><th>Compute Savings Plans</th><th>EC2 Instance Savings Plans</th></tr>
<tr><td>Applies to</td><td><b>EC2, AWS Fargate, AWS Lambda</b></td><td><b>EC2</b> only</td></tr>
<tr><td>Commitment is tied to</td><td>No particular instance family or Region</td><td><b>One instance family in one Region</b> (for example, the M family in Singapore)</td></tr>
<tr><td>Still applies when you change</td><td>Instance family, size, operating system, AZ, <b>Region</b>, or move to Fargate/Lambda</td><td>Size, operating system, tenancy, AZ (within the same instance family and Region)</td></tr>
<tr><td>Discount level</td><td>Slightly lower (the price of maximum flexibility)</td><td><b>Higher</b>, up to about 72%</td></tr>
</table>
<p>The <b>1-year or 3-year</b> term applies to Compute Savings Plans and EC2 Instance Savings Plans. Besides these two types there are also:</p>
<ul>
<li><b>Amazon SageMaker AI Savings Plans</b>: a USD/hour commitment for SageMaker AI usage (1 or 3 years).</li>
<li><b>Database Savings Plans</b> (launched December 2025): a USD/hour commitment for many database services such as Aurora, RDS, DynamoDB and ElastiCache; only a <b>1-year</b> term is available, with a discount of up to about <b>35%</b> (the highest level is for serverless options).</li>
</ul>
<p>You don't have to guess the commitment yourself: <b>AWS Cost Explorer</b> has <b>Savings Plans recommendations</b> based on your actual past usage, telling you how many USD/hour to commit and roughly how much you would save.</p>
<div class="box example"><b>🍰 Example: BanhNgon</b><p>The BanhNgon Bakery website runs 24/7 all year, and Minh is sure he will still need at least 2 servers for the next 3 years. Instead of paying On-Demand, Minh buys a 3-year <b>Compute Savings Plans</b> commitment. The next year Minh moves part of the workload to Lambda to process orders, and the discount still applies automatically because Compute Savings Plans cover Lambda too. If Minh had bought Standard RIs for one specific instance family, it would be harder to keep using the discount after changing the architecture.</p></div>

<h3>Spot Instances: the cheapest, but they can be taken back</h3>
<p>AWS always has machines sitting idle. <b>Spot Instances</b> let you use that spare capacity at a discount of up to about <b>90%</b> compared with On-Demand.</p>
<p>The trade-off: when AWS needs the capacity back, your instance can be stopped. AWS gives you only a <b>2-minute</b> warning.</p>
<p>So Spot only suits work that is <b>fault-tolerant</b> (it can survive failures and interruptions) and flexible about timing: batch processing, data analysis, image/video rendering, running tests. It does not suit a primary database or anything that must run without interruption.</p>
<div class="box example"><b>🍰 Example: BanhNgon</b><p>Every night, BanhNgon needs to process thousands of cake photos to create thumbnails for the website. If this job is interrupted, it simply resumes from the photo it was working on, and it only needs to be finished by the next morning. Minh uses <b>Spot Instances</b> and saves a lot of money. But Minh never runs the server that takes orders on Spot.</p></div>

<h3>Dedicated Instances, Dedicated Hosts and Capacity Reservations</h3>
<p>Normally, an AWS physical server runs virtual machines for many different customers (still safely isolated from each other). Some companies, because of regulations or software <b>license</b> terms, need hardware that is <b>dedicated to them alone</b>.</p>
<ul>
<li><b>Dedicated Instances</b>: your virtual machines run on hardware that is not shared with other customers. But you <b>cannot see</b> the details of the physical machine (how many sockets, how many cores).</li>
<li><b>Dedicated Hosts</b>: you rent an entire physical server and <b>can see</b> its sockets and cores. That lets you use existing licenses that are counted per socket or per core, which is called <b>BYOL</b> (Bring Your Own License). This is usually the most expensive option.</li>
</ul>
<p><b>On-Demand Capacity Reservations</b> are something else entirely: they give no discount, but they <b>reserve capacity</b> for you in a specific AZ, for as long as you like, with no 1-year or 3-year commitment. You pay the On-Demand price for the reserved capacity whether or not you run instances in it. You can combine them with Savings Plans or Regional RIs to get a discount.</p>
<div class="box trap"><b>⚠️ Common trap</b><p>"Dedicated" does not mean cheap, and it does not mean "reserved" either. Keywords <b>socket, core, BYOL, server-bound license</b> → <b>Dedicated Hosts</b>. Keywords "dedicated hardware but <b>no need</b> to see sockets/cores" → <b>Dedicated Instances</b>. Keywords "reserve capacity in one AZ, any duration, no long-term commitment" → <b>On-Demand Capacity Reservations</b>, not RIs.</p></div>

<h3>Quick picker: scenario → purchasing option</h3>
<table>
<tr><th>Scenario</th><th>Choose</th></tr>
<tr><td>Short-term, unpredictable, cannot be interrupted, no commitment wanted</td><td>On-Demand</td></tr>
<tr><td>Steady, continuous use for 1-3 years, instance type is known</td><td>Standard RI or EC2 Instance Savings Plans</td></tr>
<tr><td>Long-term commitment, but you may change instance families</td><td>Convertible RI</td></tr>
<tr><td>Commit to an amount per hour, across EC2, Fargate and Lambda</td><td>Compute Savings Plans</td></tr>
<tr><td>Flexible timing, can tolerate interruptions, lowest price wanted</td><td>Spot Instances</td></tr>
<tr><td>Licenses counted per socket/core, need visibility into the hardware</td><td>Dedicated Hosts</td></tr>
<tr><td>Need dedicated hardware, no need to see sockets/cores</td><td>Dedicated Instances</td></tr>
<tr><td>Need guaranteed capacity in one AZ, for any duration</td><td>On-Demand Capacity Reservations</td></tr>
</table>
<div class="box exam"><b>🎯 What the exam asks</b><ul>
<li>"steady-state", "run continuously for 3 years", "cannot be interrupted" → Reserved Instances / Savings Plans</li>
<li>"can be interrupted", "fault-tolerant", "batch", "most cost-effective" → Spot Instances</li>
<li>"commit to $/hour", "EC2, Fargate and Lambda" → Compute Savings Plans</li>
<li>"change instance families during the term" → Convertible Reserved Instances</li>
<li>"one instance family in one Region, resize often, change OS, largest Savings Plans discount" → EC2 Instance Savings Plans</li>
<li>"sell the remaining term to another customer" → Standard RI on the Reserved Instance Marketplace</li>
<li>"discount should apply only to the account that bought it" → the management account turns off RI/Savings Plans discount sharing</li>
<li>"zonal RI" → reserves capacity in one AZ; "regional RI" → applies to every AZ in the Region, with size flexibility</li>
<li>"per-socket / per-core licenses", "BYOL" → Dedicated Hosts</li>
<li>"reserve capacity in a specific AZ for any duration" → On-Demand Capacity Reservations</li>
<li>"short-term, unpredictable, no upfront commitment" → On-Demand</li>
</ul></div>
`,summary:["On-Demand: pay for what you use, no commitment, highest price, best for short-term and unpredictable work.","Reserved Instances: a 1-year or 3-year commitment, up to ~72% off; Standard gives the biggest discount, Convertible lets you change instance families; pay All/Partial/No Upfront.","Savings Plans: commit to an amount of money per hour for 1 or 3 years; Compute Savings Plans apply to EC2, Fargate and Lambda.","Spot: up to ~90% off, can be stopped with a 2-minute warning, only for work that can tolerate interruptions.","Dedicated Hosts show sockets/cores and support BYOL; Dedicated Instances only guarantee dedicated hardware.","On-Demand Capacity Reservations reserve capacity in one AZ for any duration; they are not a discount.","In AWS Organizations, RI and Savings Plans discounts are shared between accounts by default; the management account can turn sharing off for individual accounts.","EC2 Instance Savings Plans: one instance family in one Region, deeper discount; Compute Savings Plans are more flexible. A Zonal RI reserves capacity in one AZ, a Regional RI does not. Only Standard RIs can be resold on the RI Marketplace."],terms:[["Purchasing options","the different ways to pay for EC2"],["On-Demand Instances","instances you pay for as you use them, with no commitment"],["Reserved Instances (RI)","instances discounted in return for a 1-3 year commitment"],["Standard / Convertible RI","biggest discount but fixed / smaller discount but exchangeable"],["All / Partial / No Upfront","pay everything first / pay part first / pay nothing first"],["Savings Plans","a discount for committing to an amount of money per hour"],["Compute Savings Plans","Savings Plans that apply to EC2, Fargate and Lambda"],["Spot Instances","very cheap instances on spare capacity that can be stopped"],["Fault-tolerant","able to survive failures and interruptions"],["Dedicated Instances","instances that run on hardware not shared with others"],["Dedicated Hosts","an entire physical server rented for you alone"],["BYOL (Bring Your Own License)","using software licenses you already own"],["On-Demand Capacity Reservations","reserving capacity in one AZ, with no discount"],["Size flexibility","the discount applies across instance sizes"],["Regional / Zonal RI","RI for a whole Region / RI tied to one AZ (reserves capacity)"],["EC2 Instance Savings Plans","Savings Plans for one EC2 instance family in one Region"],["Reserved Instance Marketplace","a market for reselling the remaining term of a Standard RI"]]};
L.course["4-2"]={title:"Storage and data transfer pricing",goals:["Know the three main cost groups on AWS: compute, storage, and data transfer out","Know which factors change your Amazon S3 and Amazon EBS bill","Remember the rules for which data transfer is free and which is charged","Understand why CloudFront can help reduce data transfer costs"],html:`
<h3>Where does the AWS bill come from?</h3>
<p>The AWS pricing model is <b>pay-as-you-go</b> (you pay only for what you use). To predict your bill, you need to know that the money mainly comes from three groups:</p>
<ul>
<li><b>Compute</b>: the cost of renting the "brain" that does the processing. For example, EC2 charges for the time the instance runs, and Lambda charges for the number of invocations and how long they run.</li>
<li><b>Storage</b>: the cost of keeping data, usually charged by the amount stored per month (GB-month).</li>
<li><b>Data transfer out</b>: the cost when data leaves AWS for the internet or goes somewhere else.</li>
</ul>
<div class="box idea"><b>🧠 In plain terms</b><p>Imagine AWS is a warehouse for rent. You pay for the space your goods take up (storage), for the workers who do the work (compute), and for the <b>trucks that carry goods out of the warehouse</b> (data transfer out). Bringing goods <b>into</b> the warehouse costs nothing, because the owner wants you to store as much as possible.</p></div>

<h3>Amazon S3 pricing</h3>
<p><b>Amazon S3</b> (Simple Storage Service, an object storage service) is used to keep files: photos, videos, backups… Your S3 bill depends on:</p>
<ul>
<li><b>Amount of data stored</b>: the more GB you store, the more you pay.</li>
<li><b>Storage class</b>: for example, S3 Standard for frequently used data has a higher storage price; classes for rarely used data or long-term archiving (such as S3 Glacier) have a lower storage price but may charge a fee when you get the data back (retrieval).</li>
<li><b>Requests</b>: every read, write or list operation has a small price, which adds up to a meaningful amount if there are a great many of them.</li>
<li><b>Data transfer out</b>: data downloaded from S3 to the internet is charged.</li>
</ul>
<p>In contrast, <b>data uploaded into S3 from the internet is free</b>. The number of IAM users or the number of AZs in the Region has no effect on your S3 bill.</p>
<p>The pricing pattern across storage classes: <b>the cheaper the storage price per GB, the more it costs to get data out</b> (retrieval fees, waiting time, minimum storage duration). The table below only compares the direction of prices, not actual numbers:</p>
<table>
<tr><th>Storage class</th><th>Storage price</th><th>When you retrieve data</th><th>Good for</th></tr>
<tr><td>S3 Standard</td><td>Highest</td><td>Instant, no retrieval fee</td><td>Frequently used data</td></tr>
<tr><td>S3 Intelligent-Tiering</td><td>Drops automatically when data is used less (+ a small per-object monitoring fee)</td><td>Instant, <b>no retrieval fee</b></td><td>Unpredictable access patterns, when you don't want to write lifecycle rules yourself</td></tr>
<tr><td>S3 Standard-IA / One Zone-IA</td><td>Cheaper (One Zone-IA is cheaper still but stores data in only 1 AZ)</td><td>Instant (milliseconds), with a retrieval fee</td><td>Rarely used (about monthly) but needed quickly</td></tr>
<tr><td>S3 Glacier Instant Retrieval</td><td>Cheaper still</td><td>Still milliseconds, higher retrieval fee</td><td>Long-term storage opened about once a quarter but needed immediately</td></tr>
<tr><td>S3 Glacier Flexible Retrieval</td><td>Very cheap</td><td>Wait a few minutes to a few hours</td><td>Archives and backups that are rarely needed</td></tr>
<tr><td>S3 Glacier Deep Archive</td><td><b>Cheapest</b></td><td>Wait up to about 12-48 hours</td><td>Keeping data for many years for compliance</td></tr>
</table>
<p>Money-saving tip: the less often data is opened, the more it makes sense to move it to a cheaper storage class. S3 has <b>lifecycle rules</b> that automatically move old files to a cheaper class, or delete files after a set time. That way you don't have to move files by hand one at a time, and your bill still goes down over time.</p>

<h3>Amazon EBS pricing</h3>
<p><b>Amazon EBS</b> (Elastic Block Store) is the "hard drive" attached to an EC2 server. The key point: EBS charges for the <b>capacity you provision</b> (provisioned storage), <b>not the capacity you actually use</b>.</p>
<p>You create a 500 GB volume but only store 50 GB of data on it? You still pay for 500 GB. The EBS bill includes:</p>
<ul>
<li><b>Provisioned capacity</b>, charged per GB-month.</li>
<li><b>Provisioned performance</b> on some volume types. For example, a <b>gp3</b> volume (the common SSD type) includes a baseline level of performance in its price; if you configure extra <b>IOPS</b> (read/write operations per second) or <b>throughput</b> (amount of data read/written per second) above the baseline, you pay more.</li>
<li><b>Snapshot</b> (a point-in-time backup of a volume): charged by the amount of snapshot data being stored.</li>
</ul>
<p>Things that do <b>not</b> change the price of an EBS volume: whether the EC2 instance is running or stopped, and how much data is actually written on the volume.</p>
<div class="box trap"><b>⚠️ Common trap</b><p>Stopping an EC2 instance stops the charge for instance running hours, but the attached EBS volume is <b>still charged</b> because it is still holding your data. To stop paying, you have to delete the volume (after backing it up if needed).</p></div>

<h3>Data transfer pricing rules</h3>
<p>The exam loves this topic. Remember the general principle: <b>in is free, out costs money</b>, and the farther data travels (across AZs, across Regions), the more likely it is to be charged.</p>
<table>
<tr><th>Direction of data transfer</th><th>Charged?</th></tr>
<tr><td>From the internet <b>into</b> AWS (into EC2, into S3…)</td><td>Free</td></tr>
<tr><td>From AWS <b>out</b> to the internet</td><td>Charged (but the <b>first 100 GB each month is free</b>, aggregated across all services and Regions, except the China Regions and GovCloud)</td></tr>
<tr><td>Between two different <b>Regions</b></td><td>Charged</td></tr>
<tr><td>Between two different <b>AZs</b> in the same Region</td><td>Charged</td></tr>
<tr><td>Within the <b>same AZ</b>, using private IP addresses</td><td>Free</td></tr>
<tr><td>Between EC2 and S3 in the <b>same Region</b></td><td>Free</td></tr>
</table>
<p>A <b>private IP</b> address is a "house number" used only inside your private network on AWS, unlike a public address that faces the internet. One more note: since <b>February 1, 2024</b>, every <b>public IPv4 address</b> (including an Elastic IP attached to an instance) is charged <b>0.005 USD/hour</b> per address, so an EC2 instance with a public IP costs about 3.6 USD/month extra.</p>
<p>The consequence: if two application tiers exchange a lot of data with each other across two different AZs, placing them <b>in the same AZ</b> reduces the data transfer charge. In exchange, you lose fault tolerance if that AZ has a problem, so only do this for non-critical workloads. This is a trade-off between cost and availability.</p>
<div class="box example"><b>🍰 Example: BanhNgon</b><p>A customer in Hanoi uploads a cake review photo to the BanhNgon Bakery website: this data going <b>into</b> S3 is free. Every time another customer opens the page and views the photo, the data goes <b>out</b> to the internet and is charged. When BanhNgon expands to Japan and Minh copies all the photos from the Singapore Region to the Tokyo Region, the copy between the two Regions also costs money. Minh makes a note of it to include in the budget.</p></div>

<h3>How does CloudFront help reduce data transfer costs?</h3>
<p><b>Amazon CloudFront</b> is a <b>CDN</b> (Content Delivery Network): it keeps cached copies of your content at <b>edge locations</b> close to your users.</p>
<p>The cost benefits:</p>
<ul>
<li>Cached content is served to users from the edge location, so the origin server (such as S3 or EC2) has to send less data.</li>
<li>Data transfer from AWS origins (such as S3 and EC2) to CloudFront is not charged as data transfer out; you pay according to the CloudFront price list, which is usually more favorable at high viewing volumes.</li>
<li>On top of that, pages load faster for users who are far away.</li>
</ul>
<div class="box example"><b>🍰 Example: BanhNgon</b><p>The cake photos are viewed over and over by many customers in Ho Chi Minh City and Japan. Minh puts CloudFront in front of S3. From then on, most views fetch the photos from an edge location near the customer, S3 rarely has to send the photos out directly, the site is faster and the data transfer cost is easier to control.</p></div>

<h3>AWS Free Tier</h3>
<p>AWS has a <b>Free Tier</b> program that lets newcomers try some services within limits at no cost. However, the Free Tier terms have changed before and may change again. Always check the official AWS Free Tier page before relying on it, and set up cost alerts (next lesson) so you are not caught by surprise.</p>
<p>A summary of the current model (accounts created on or after July 15, 2025): a new account receives <b>100 USD in credits</b>, can earn <b>up to 100 USD more</b>, and chooses the <b>Free plan</b> (never charged, up to 6 months) or the <b>Paid plan</b> (you pay for anything beyond the credits). In addition, more than 30 services have a free monthly allowance (<i>always free</i>). Details are in hands-on lesson <b>5-1</b>.</p>
<div class="box exam"><b>🎯 What the exam asks</b><ul>
<li>"factors that affect S3 cost" → amount of data stored, storage class, requests, data transfer out (not data transfer in)</li>
<li>"which data transfer incurs a charge" → between Regions, to the internet, between AZs</li>
<li>"which data transfer is free" → inbound from the internet; same AZ using private IP</li>
<li>"EBS charged for" → provisioned storage, not the storage actually used; with gp3, extra IOPS/throughput above the baseline; snapshots are charged separately</li>
<li>"unpredictable access, automatic, no retrieval fees" → S3 Intelligent-Tiering; "rarely accessed but milliseconds" → S3 Glacier Instant Retrieval; "cheapest long-term archive" → S3 Glacier Deep Archive</li>
<li>"reduce cross-AZ data transfer charges" → place the tiers that exchange a lot of data in the same AZ (trading away availability)</li>
<li>"reduce data transfer cost and latency for global users" → Amazon CloudFront</li>
</ul></div>
`,summary:["The three main cost groups on AWS: compute, storage and data transfer out.","The S3 bill depends on the amount of data, the storage class, the number of requests and data transferred out; data going into S3 is free.","S3 storage classes: the cheaper the storage price, the higher the fee or wait to retrieve data; Intelligent-Tiering moves data between tiers automatically with no retrieval fee.","EBS charges for provisioned capacity (even if it is not full or the EC2 instance is stopped), plus IOPS/throughput above the baseline (gp3) and snapshots.","In from the internet: free. Out to the internet, between Regions, between AZs: charged. Same AZ over private IP: free.","CloudFront caches content at edge locations, reducing load on the origin and helping optimize data transfer costs.","The Free Tier exists, but its terms can change; always check the official page."],terms:[["Pay-as-you-go","you pay only for what you use"],["Compute","processing power, such as servers and functions"],["Storage","keeping data"],["Data transfer in / out","data moving into / out of AWS"],["Storage class","an S3 pricing tier based on how often data is accessed"],["Requests","read/write operations on your data"],["Retrieval fee","a fee to get data back from an archive class"],["Provisioned storage","the capacity you allocated, used or not"],["IOPS / Throughput","read/write operations per second / amount of data read/written per second"],["S3 Intelligent-Tiering","an S3 class that moves data between tiers based on access"],["Snapshot","a point-in-time backup of a volume"],["Private IP address","an address used only inside your private network"],["CDN (Content Delivery Network)","a network that serves content from locations near users"],["Edge location","a site close to users that caches content"],["AWS Free Tier","the AWS program for trying services at no cost"]]};
L.course["4-3"]={title:"Cost management tools and AWS Organizations",goals:["Know which tool to use before, during and after using AWS to manage your money","Tell apart Pricing Calculator, Cost Explorer, AWS Budgets and the Cost and Usage Report","Understand cost allocation tags and why you have to activate them","Understand how AWS Organizations and consolidated billing help you save"],html:`
<h3>Three moments for managing money</h3>
<p>On AWS, charges build up continuously as you use services. If you don't keep track, you may get a surprise bill at the end of the month. AWS has many tools, and each one fits a particular moment:</p>
<div class="flow"><span>Before you use AWS: Pricing Calculator</span><span>While you use it: Budgets (alerts)</span><span>After you use it: Cost Explorer, Cost and Usage Report</span></div>
<div class="box idea"><b>🧠 In plain terms</b><p>It's like managing a family's grocery money. <b>Before</b> you go shopping, you sit down and work out what you'll buy and roughly how much it will cost. <b>While</b> you're spending, you set a limit: "if we go over 5 million VND this month, tell me". <b>After</b> spending, you open the expense notebook to see where the money went, and guess how much you'll spend next month.</p></div>

<h3>Before you use AWS: AWS Pricing Calculator</h3>
<p><b>AWS Pricing Calculator</b> is a free web tool for <b>estimating</b> costs before you build. You pick services and enter a configuration (how many instances, which type, how many GB of storage, which Region…), and the tool gives you an expected monthly figure.</p>
<p>You can save the estimate and share it with your boss or accountant (through a link, or by exporting a file). It is very useful for comparing costs before moving from an on-premises system (one in your own building) to AWS. But Pricing Calculator only <b>estimates</b>: it does <b>not</b> show the actual costs you have already run up, and it does not send alerts.</p>

<h3>During and after use: Budgets, Cost Explorer, CUR</h3>
<h4>AWS Budgets: set a threshold and get alerts</h4>
<p><b>AWS Budgets</b> lets you set a threshold and then <b>sends an alert</b> (by email or Amazon SNS) when the actual figure, or the <b>forecasted</b> figure, goes over it. There are several types of budget:</p>
<ul>
<li><b>Cost budget</b>: tracks an amount of money (for example 200 USD/month).</li>
<li><b>Usage budget</b>: tracks usage (for example number of GB, or hours of instance run time).</li>
<li><b>Reservation budget</b> (RI/Savings Plans): alerts you when <b>utilization</b> (the share of what you bought that is actually being used) or <b>coverage</b> (the share of your usage that is covered by the discount) <b>drops below</b> a threshold, meaning you are paying for reserved capacity you aren't using.</li>
</ul>
<p><b>Budgets actions</b>: when a threshold is crossed, Budgets can <b>automatically</b> (or after waiting for your approval) attach a restrictive <b>IAM policy</b> or <b>SCP</b> (for example to block creating new resources), or stop EC2/RDS instances. You don't have to write any code.</p>
<h4>AWS Cost Anomaly Detection: spotting unusual spend</h4>
<p>Sometimes it's hard to set a fixed threshold because costs go up and down unpredictably. <b>AWS Cost Anomaly Detection</b> uses <b>machine learning</b> (ML) to learn your normal spending pattern, then alerts you when a service or account spends an unusual amount, along with a <b>root cause analysis</b> (what caused it). The difference from Budgets: Budgets relies on a threshold <b>you set</b>, while Anomaly Detection <b>learns by itself</b> what counts as unusual.</p>
<h4>AWS Cost Explorer: analyze the past and forecast</h4>
<p><b>AWS Cost Explorer</b> shows charts of your costs over time. You filter and group by service, linked account (member account), Region, tag… to see where the money goes. It also <b>forecasts</b> future costs based on your earlier usage. Cost Explorer also has utilization/coverage reports for RIs and Savings Plans (for viewing), and <b>Savings Plans recommendations</b>: based on your real usage history, it suggests how many USD/hour you should commit to and how much you would save.</p>
<h4>AWS Cost and Usage Report (CUR)</h4>
<p><b>AWS Cost and Usage Report</b> is the <b>most detailed</b> data source: every usage line item, every resource, by hour or by day. The report is delivered to an <b>S3 bucket</b> of yours. From there you can analyze it with tools such as Amazon Athena or Amazon Quick (formerly Amazon QuickSight). Today CUR is configured through the Data Exports feature in the Billing console.</p>
<h4>Billing dashboard</h4>
<p>The <b>Billing and Cost Management</b> page in the AWS Management Console is where you see this month's total cost, bills from previous months, payment methods, and where you open the tools above.</p>
<table>
<tr><th>Tool</th><th>When</th><th>Used for</th></tr>
<tr><td>AWS Pricing Calculator</td><td>Before use</td><td>Estimating the cost of a planned architecture</td></tr>
<tr><td>AWS Budgets</td><td>During use</td><td>Setting thresholds (cost, usage, RI/Savings Plans), alerting when they are crossed (actual or forecasted), can take action automatically</td></tr>
<tr><td>AWS Cost Anomaly Detection</td><td>During use</td><td>ML detects unusual spend by itself, with the root cause, no threshold needed</td></tr>
<tr><td>AWS Cost Explorer</td><td>After use</td><td>Charts, analysis of past costs, forecasts of future costs</td></tr>
<tr><td>Cost and Usage Report</td><td>After use</td><td>The most detailed data, delivered to S3</td></tr>
</table>
<div class="box trap"><b>⚠️ Common trap</b><p>Budgets and Cost Explorer both "have forecasts", so they are easy to mix up. Remember: if you want to <b>get an alert</b> when a threshold is crossed → <b>Budgets</b>. If you want to <b>view charts and analyze</b> costs → <b>Cost Explorer</b>. And for an estimate when <b>nothing is running yet</b> → <b>Pricing Calculator</b>, not Cost Explorer (Cost Explorer needs data from past usage).</p></div>

<h3>Cost allocation tags: knowing whose money it is</h3>
<p>A <b>tag</b> is a "key = value" label you attach to an AWS resource, for example <code>Project = Website</code> or <code>Department = Marketing</code>. When tags are used to split up costs, they are called <b>cost allocation tags</b>.</p>
<ul>
<li><b>AWS-generated tags</b>: AWS attaches them for you, and you don't have to do anything. For example, the <b>createdBy</b> tag records which IAM user or role created the resource. Very useful when engineers tend to forget to add tags themselves.</li>
<li><b>User-defined tags</b>: you choose the name and value yourself (for example Project, Department). They depend on everyone adding tags consistently.</li>
</ul>
<p>The key point: <b>both types</b> must be <b>activated</b> as cost allocation tags in the Billing page (by the management account if you use Organizations) before they show up in Cost Explorer and cost reports.</p>
<div class="box example"><b>🍰 Example: BanhNgon Bakery</b><p>Before moving to AWS, Minh uses <b>Pricing Calculator</b> to estimate the cost and sends it to Lan for approval. Once things are running for real, Minh sets an <b>AWS Budgets</b> budget of 200 USD/month that emails both of them when spending passes 80%. Minh adds a <code>Project</code> tag to the resources of the website, the ordering app and the chatbot, then activates the tag in Billing. At the end of the month, Lan opens <b>Cost Explorer</b> and sees right away how much the chatbot costs compared with the website.</p></div>

<h3>AWS Organizations and consolidated billing</h3>
<p>As a company grows, it usually splits its work across several <b>AWS accounts</b>: one for the test environment, one for the production system, one for each department… to make permissions easier to manage and to separate costs.</p>
<p><b>AWS Organizations</b> lets you gather those accounts into one organization and manage them centrally from a <b>management account</b>. The remaining accounts are called <b>member accounts</b>, and they can be placed into groups called OUs (Organizational Units).</p>
<p>The <b>consolidated billing</b> feature of Organizations (one combined bill) gives you:</p>
<ul>
<li><b>A single bill</b> for all accounts, paid by the <b>management account</b>, while you can still see the details for each account.</li>
<li><b>Volume discounts</b>: the usage of all accounts is added together. For example, with S3 the more you use the lower the unit price, so combined usage reaches the cheaper pricing tier sooner.</li>
<li>RI and Savings Plans discounts are shared across accounts (by default). The management account can turn sharing off for individual accounts.</li>
<li><b>No extra charge</b> for using consolidated billing.</li>
</ul>
<p>One more point: Organizations has <b>SCPs</b> (Service Control Policies), which set the maximum limit on what member accounts are allowed to do.</p>
<div class="box example"><b>🍰 Example: BanhNgon</b><p>When it opens a branch in Japan, BanhNgon has three accounts: Vietnam, Japan and testing. Minh gathers all three into AWS Organizations. Lan receives just one bill each month, S3 usage is added together so the unit price is better, and the Savings Plans bought in the Vietnam account also lower the bill for the Japan account.</p></div>
<div class="box exam"><b>🎯 What the exam asks</b><ul>
<li>"estimate cost before migrating / before building" → AWS Pricing Calculator</li>
<li>"alert when costs exceed a threshold" / "forecasted cost exceeds budget" → AWS Budgets</li>
<li>"RI / Savings Plans utilization or coverage falls below X%" → AWS Budgets (reservation budget)</li>
<li>"automatically apply an IAM policy / SCP when budget is exceeded, no code" → AWS Budgets actions</li>
<li>"machine learning", "unusual spend", "root cause", no fixed threshold → AWS Cost Anomaly Detection</li>
<li>"recommend hourly commitment based on past usage" → Savings Plans recommendations in Cost Explorer</li>
<li>"which IAM user/role created each resource" without relying on people adding tags → activate the AWS-generated tag createdBy</li>
<li>"visualize, analyze past costs, forecast" → AWS Cost Explorer</li>
<li>"most detailed / comprehensive cost and usage data, delivered to S3" → AWS Cost and Usage Report</li>
<li>"track costs by project or department" → cost allocation tags</li>
<li>"types of cost allocation tags" → AWS-generated and user-defined</li>
<li>"single bill, volume discounts for multiple accounts" → AWS Organizations consolidated billing</li>
</ul></div>
`,summary:["Before use: AWS Pricing Calculator to estimate costs.","During use: AWS Budgets sets thresholds (cost, usage, RI/Savings Plans) and alerts when the actual or forecasted figure crosses them; Budgets actions automatically attach a restrictive IAM policy/SCP.","AWS Cost Anomaly Detection uses ML to detect unusual spend by itself, with the root cause, and needs no fixed threshold.","After use: Cost Explorer for analysis, forecasts and Savings Plans recommendations; the Cost and Usage Report is the most detailed data, delivered to S3.","Cost allocation tags are either AWS-generated (for example createdBy, attached by AWS) or user-defined; both must be activated in Billing before they appear in reports.","AWS Organizations groups multiple accounts; consolidated billing gives one bill and volume discounts, at no charge.","SCPs in Organizations limit what member accounts can do."],terms:[["AWS Pricing Calculator","a free web tool for estimating AWS costs before you build"],["AWS Budgets","set budgets and get cost alerts"],["AWS Cost Explorer","a tool for analyzing and forecasting costs"],["Forecast","a prediction of future cost or usage"],["Reservation budget (utilization / coverage)","a budget that tracks how much of your RIs or Savings Plans is used / how much usage they cover"],["Budgets actions","automatic actions taken when a budget is exceeded"],["AWS Cost Anomaly Detection","detects unusual spend using ML"],["AWS Cost and Usage Report (CUR)","the most detailed cost and usage report"],["Billing and Cost Management console","the page for managing bills and costs"],["Tag","a key-value label attached to a resource"],["Cost allocation tags","tags used to split costs by project, team, etc."],["AWS-generated / User-defined tags","tags created by AWS / tags created by the user"],["AWS Organizations","a service for managing multiple AWS accounts"],["Management account / Member account","the account that manages and pays for the organization / the other accounts in it"],["Consolidated billing","one combined bill for all accounts"],["Volume discounts","lower unit prices the more you use"],["Service Control Policies (SCPs)","policies that limit what member accounts can do"]]};
L.course["4-4"]={title:"AWS Support, technical resources and partners",goals:["Know the AWS Support plans in the current Exam Guide and which one is free","Understand what Trusted Advisor and AWS Health Dashboard are for","Tell apart the sources of help: re:Post, Knowledge Center, Prescriptive Guidance, documentation","Know when to turn to AWS Professional Services, AWS Partner Network, AWS Marketplace, Trust & Safety"],html:`
<h3>The AWS Support plans</h3>
<p>When you use AWS, sooner or later you will run into a problem: a server fails, you don't understand your bill, or you need architecture advice. <b>AWS Support</b> is the set of customer support plans. According to the current CLF-C02 Exam Guide, the plans are:</p>
<ul>
<li><b>Basic Support</b>: <b>free</b>, included for <b>every AWS customer</b>. It includes <b>24/7 customer service</b> for account and billing questions, documentation, whitepapers, <b>AWS re:Post</b>, a personalized <b>AWS Health</b> page and the <b>core checks</b> of <b>Trusted Advisor</b>. The most important point: with Basic you <b>cannot open a technical support case</b>; you can only open cases about your account/billing (customer service) and <b>service limit increase</b> requests (raising a quota).</li>
<li><b>AWS Business Support+</b>: the lowest paid plan, which AWS recommends as the <b>minimum for production workloads</b>. You can open unlimited <b>technical support cases</b> by <b>phone, web and chat</b> 24/7 (plus the <b>AWS Support App in Slack</b> and the <b>AWS Support API</b>). It includes the <b>full set</b> of <b>Trusted Advisor</b> checks, the <b>AWS Health API</b>, AI-powered assistance and <b>architectural guidance</b> from AWS experts. When a critical system is down: response in <b>&lt; 30 minutes</b>.</li>
<li><b>AWS Enterprise Support</b>: for <b>business-critical</b> workloads across the whole organization. It adds a <b>designated Technical Account Manager (TAM)</b> (a technical advisor assigned specifically to you), <b>AWS Security Incident Response</b> at no extra charge, <b>Trusted Advisor Priority</b>, support for big events/product launches (planned events) and proactive services. When a critical system is down: response in <b>&lt; 15 minutes</b>.</li>
<li><b>AWS Unified Operations</b>: the top plan, for <b>mission-critical</b> workloads that need high resilience. Besides the TAM you also get <b>Domain Specialist Engineers</b> and <b>Incident Management Engineers</b>, and <b>24/7 workload monitoring</b>. For a critical incident: an <b>Incident Management Engineer</b> responds in <b>&lt; 5 minutes</b>.</li>
</ul>
<p>According to the <b>AWS Support Plans</b> page (checked November 2026), the initial response times of the 3 paid plans are:</p>
<ul>
<li><b>Business/mission-critical system down</b>: Business Support+ &lt; 30 minutes · Enterprise &lt; 15 minutes · Unified Operations &lt; 5 minutes.</li>
<li><b>Production system down</b>: &lt; 1 hour (all 3 plans).</li>
<li><b>Production system impaired</b>: &lt; 4 hours (all 3 plans).</li>
<li><b>System impaired</b>: &lt; 12 hours (all 3 plans).</li>
<li><b>General guidance</b>: &lt; 24 hours (all 3 plans).</li>
</ul>
<p> These are <b>response targets</b> that AWS aims to meet, not a promise of how fast the problem will be fixed. For the price of each plan, see the <b>AWS Support Plans</b> page; prices can change, so don't memorize old price figures you find online.</p>
<table>
<tr><th>Criteria</th><th>Basic Support</th><th>AWS Business Support+</th><th>AWS Enterprise Support</th><th>AWS Unified Operations</th></tr>
<tr><td>Cost</td><td>Free, every customer</td><td>Paid</td><td>Paid</td><td>Paid</td></tr>
<tr><td>Recommended for</td><td>Included for every customer</td><td>Production workloads (the minimum)</td><td>Business-critical workloads</td><td>Mission-critical workloads</td></tr>
<tr><td>Technical support case</td><td>No (only account/billing and service limit increase)</td><td>Yes, unlimited; phone, web, chat 24/7</td><td>Yes, same as Business Support+</td><td>Yes, same as Business Support+</td></tr>
<tr><td>Response when a critical system is down</td><td>Not available</td><td>&lt; 30 minutes</td><td>&lt; 15 minutes</td><td>&lt; 5 minutes (Incident Management Engineer)</td></tr>
<tr><td>Production system down</td><td>Not available</td><td>&lt; 1 hour</td><td>&lt; 1 hour</td><td>&lt; 1 hour</td></tr>
<tr><td>Trusted Advisor</td><td>Core checks</td><td>Full set of checks</td><td>Full set + Trusted Advisor Priority</td><td>Full set + Trusted Advisor Priority</td></tr>
<tr><td>AWS Health</td><td>Personalized Health Dashboard, alerts</td><td>Health Dashboard + <b>Health API</b></td><td>Health Dashboard + Health API</td><td>Health Dashboard + Health API + 24/7 workload monitoring</td></tr>
<tr><td>Dedicated people</td><td>None</td><td>None (the designated TAM starts with Enterprise)</td><td><b>Designated TAM</b></td><td>Designated TAM + Domain Specialist Engineers + Incident Management Engineers</td></tr>
</table>
<div class="box exam"><b>🎯 What the exam asks</b><ul>
<li>"included for all customers at no cost" → Basic Support</li>
<li>"cannot open technical support cases" / "only account and billing questions" → Basic Support</li>
<li>"minimum recommended plan for production workloads", "lowest-cost plan with 24/7 technical support", "full set of Trusted Advisor checks", "AWS Health API" (the cheapest plan that has it) → AWS Business Support+</li>
<li>"designated Technical Account Manager (TAM)", "Trusted Advisor Priority", "business-critical", "critical response &lt; 15 minutes" → AWS Enterprise Support</li>
<li>"mission-critical", "Incident Management Engineers", "domain specialist engineers", "response within 5 minutes", "24/7 workload monitoring" → AWS Unified Operations</li>
</ul></div>
<p>If older study materials mention the <b>Developer</b>, <b>Business</b> or <b>Enterprise On-Ramp</b> plans: those are old plans that are being retired. Since <b>December 2, 2025</b> AWS no longer sells Developer and Business Support to new customers (they are replaced by <b>Business Support+</b>); during 2026, Enterprise On-Ramp customers are automatically upgraded to <b>Enterprise Support</b>; and from <b>January 1, 2027</b> all three old plans are officially discontinued (only the AWS GovCloud (US) Regions keep them). So older practice exams may ask about "Developer Support" or the "Enterprise On-Ramp TAM pool"; know those names, but study the current plans. In the exam, rely on the main idea: Basic is free, and the paid plans respond faster and add more expert help.</p>
<div class="box idea"><b>🧠 In plain terms</b><p>It's like a phone warranty. Everyone who buys a phone gets a free basic warranty: you can look up the guides and call the hotline about your bill. If you want a priority technician, a fast response, or even one person who looks after your company specifically, you buy a higher warranty plan.</p></div>
<p>The place to <b>open a support request</b> (a support case) is the <b>AWS Support Center</b> in the AWS Management Console. With Basic Support, you can still open cases about your account and billing.</p>

<h3>AWS Trusted Advisor and AWS Health Dashboard</h3>
<h4>AWS Trusted Advisor</h4>
<p><b>AWS Trusted Advisor</b> automatically checks your account and gives recommendations in these categories:</p>
<ul>
<li><b>Cost optimization</b>: for example servers running idle, or EBS volumes not attached to anything.</li>
<li><b>Performance</b>.</li>
<li><b>Security</b>: for example network ports open to everyone, or a root user without MFA turned on.</li>
<li><b>Fault tolerance</b> (the ability to keep working when something fails): for example missing backups, or running in only one AZ.</li>
<li><b>Service limits / quotas</b>: warns you when you are about to hit a limit.</li>
<li><b>Operational excellence</b>: for example missing the recommended logging or monitoring configuration.</li>
</ul>
<p>Basic Support only has a few core checks; the higher plans unlock more checks.</p>
<h4>AWS Health Dashboard</h4>
<p><b>AWS Health Dashboard</b> shows the status of AWS services, especially incidents or scheduled maintenance that <b>affect your own resources</b>, along with guidance on how to fix them. This is different from CloudTrail (which records who called which API in your account). The <b>AWS Health API</b> lets your software fetch that information automatically.</p>
<div class="box example"><b>🍰 Example: BanhNgon Bakery</b><p>One morning the BanhNgon website is unusually slow. Minh opens <b>AWS Health Dashboard</b> and sees that AWS is reporting an incident in an AZ where his server runs. After that, Minh checks <b>Trusted Advisor</b> and gets these recommendations: run in multiple AZs (fault tolerance) and delete a few forgotten EBS volumes (cost optimization).</p></div>

<h3>Resources for self-study and looking things up</h3>
<ul>
<li><b>AWS re:Post</b>: a question-and-answer community. You ask a question, and other users and AWS experts answer.</li>
<li><b>AWS Knowledge Center</b>: ready-made answers to common questions and problems, written by AWS (now hosted on re:Post).</li>
<li><b>AWS Prescriptive Guidance</b>: proven strategies, guides and patterns for migrating and modernizing systems on the cloud.</li>
<li><b>AWS Documentation</b> (the technical docs), <b>whitepapers</b> (in-depth papers) and <b>AWS blogs</b>: official, free sources of knowledge.</li>
</ul>
<p>All of the sources above are <b>self-service and free</b> for every customer, even those with only Basic Support. In contrast, <b>AWS Professional Services</b>, APN partners and the paid Support plans all <b>cost money</b>.</p>
<div class="box trap"><b>⚠️ Common trap</b><p>re:Post and Knowledge Center are easy to confuse. <b>re:Post</b> is a <b>question-and-answer community</b> (community-driven Q&amp;A). <b>Knowledge Center</b> is <b>ready-made articles</b> for frequently asked questions. <b>Prescriptive Guidance</b> is <b>strategy guides and patterns</b> for migration. And <b>AWS Artifact</b> is where you download compliance reports; it is not a place for questions and answers.</p></div>

<h3>People who help: Professional Services, Partners, Trust &amp; Safety</h3>
<ul>
<li><b>AWS Professional Services</b>: AWS's own team of experts, who work directly with customers to reach big goals such as a large-scale migration.</li>
<li><b>AWS Solutions Architects</b> (SAs): AWS technical staff (usually working alongside the account/sales team) who help customers <b>design architectures</b> on AWS: choosing the right services, applying Well-Architected best practices, and reviewing a design before it is built. This is different from Professional Services (a <b>paid</b> consulting team that works on the project with you) and the TAM (who follows your operations closely and comes with Enterprise Support and above). Exam keywords: "guidance on designing / architecting a solution on AWS" → Solutions Architect.</li>
<li><b>AWS Partner Network (APN)</b>: outside companies that work with AWS. There are two main kinds: <b>system integrators</b>/consulting and implementation firms (you hire them to do a project) and <b>ISVs</b> (Independent Software Vendors, which sell software that runs on AWS). Benefits of joining the APN (per the Exam Guide, task 4.3):
<ul>
<li><b>Partner training and certification</b>: training and certifications just for the partner's employees.</li>
<li><b>Partner events</b>: events for partners (conferences, workshops, product update sessions).</li>
<li><b>Partner volume discounts</b>: volume-based discounted pricing for partners.</li>
<li><b>Recognized expertise</b> through the <b>AWS Competency</b> program (for example a specialization in migration or security).</li>
<li><b>Go-to-market</b> support: marketing, co-selling, and a listing in the partner directory (Partner Solutions Finder) so customers can find them.</li>
<li><b>Funding</b>: funds from AWS, for example for a migration project or a proof of concept (a trial) with a customer.</li>
</ul> Note: joining the APN does <b>not</b> mean the partner's customers get a paid Support plan for free.</li>
<li><b>AWS Trust &amp; Safety team</b>: the team that handles <b>abuse</b>. If you see AWS resources being used to send spam, launch attacks, run scams… you report it to this team.</li>
</ul>

<h3>AWS Marketplace</h3>
<p><b>AWS Marketplace</b> is an online "software market": you find, buy and quickly deploy third-party software (security, monitoring, databases…) that runs on AWS. What you buy is <b>charged on your AWS bill</b>, so you don't need a separate payment contract with each vendor. Because it is on your AWS bill, you can view and analyze software costs with tools such as Cost Explorer.</p>
<ul>
<li>On the <b>seller</b> side: a software vendor (ISV) that wants to sell its products, including SaaS, to AWS customers <b>lists them on AWS Marketplace</b>.</li>
<li><b>Private Marketplace</b>: a company creates a <b>catalog of approved products</b>; employees in every account in the organization can see and subscribe to only the products in that catalog. It is used to control purchasing (governance).</li>
<li><b>Entitlement</b> (the right to use what you bought): each time you subscribe to a product on Marketplace, you receive usage rights according to the contract (number of licenses, number of users, duration). These rights are tracked centrally (for example in <b>AWS License Manager</b>) and can be shared with other accounts in the organization. The Exam Guide (task 4.3) mentions Marketplace in three roles: <b>cost management</b> (charged on the AWS bill), <b>governance</b> (Private Marketplace) and <b>entitlement</b>.</li>
</ul>
<div class="box example"><b>🍰 Example: BanhNgon</b><p>To expand to Japan, Lan hires an <b>APN partner</b> with migration experience to help design the system. Minh buys firewall software on <b>AWS Marketplace</b>, and the charge goes straight onto the AWS bill. One day, Minh discovers a server on AWS that keeps sending spam to the shop's mailbox, so he reports it to <b>AWS Trust &amp; Safety</b>.</p></div>

<h3>Quick table: what you need → where to go</h3>
<table>
<tr><th>Need</th><th>Go to</th></tr>
<tr><td>Free support included with every account</td><td>Basic Support</td></tr>
<tr><td>Open a support request (support case)</td><td>AWS Support Center</td></tr>
<tr><td>Recommendations on savings, security, fault tolerance, service limits</td><td>AWS Trusted Advisor</td></tr>
<tr><td>AWS incidents/maintenance affecting your resources</td><td>AWS Health Dashboard / Health API</td></tr>
<tr><td>Ask the community and experts</td><td>AWS re:Post</td></tr>
<tr><td>Ready-made answers to common questions</td><td>AWS Knowledge Center</td></tr>
<tr><td>Strategies and patterns for migration</td><td>AWS Prescriptive Guidance</td></tr>
<tr><td>A team of AWS experts working on a big project with you</td><td>AWS Professional Services</td></tr>
<tr><td>Advice on designing a solution architecture on AWS</td><td>AWS Solutions Architects</td></tr>
<tr><td>Hire an outside company for consulting and implementation</td><td>AWS Partner Network</td></tr>
<tr><td>Buy third-party software, paid through the AWS bill</td><td>AWS Marketplace</td></tr>
<tr><td>Report AWS resources being used for abuse</td><td>AWS Trust &amp; Safety</td></tr>
</table>
<div class="box exam"><b>🎯 What the exam asks</b><ul>
<li>"support plan included at no additional cost" → Basic Support</li>
<li>"open a technical support case" → AWS Support Center</li>
<li>"recommendations to reduce cost, idle resources, security, service limits" → AWS Trusted Advisor</li>
<li>"events and scheduled maintenance affecting my resources" → AWS Health Dashboard</li>
<li>"community-driven Q&amp;A" → AWS re:Post</li>
<li>"proven strategies, guides, patterns for migration" → AWS Prescriptive Guidance</li>
<li>"global team of AWS experts for business outcomes" → AWS Professional Services</li>
<li>"hire a partner to help migrate" → AWS Partner Network</li>
<li>"buy third-party software, billed through AWS" → AWS Marketplace; "sell my software/SaaS to AWS customers" → list it on AWS Marketplace</li>
<li>"curated list of approved products", "control which products teams can subscribe to" → Private Marketplace</li>
<li>"manage and share licenses/entitlements for software bought on AWS Marketplace" → AWS Marketplace (tracked with AWS License Manager)</li>
<li>"training and certification, partner events, volume discounts, recognized expertise, go-to-market support, funding for a partner company" → join the APN (AWS Competency/specializations)</li>
<li>"help designing an architecture / guidance on how to build on AWS" → AWS Solutions Architects</li>
<li>"self-service, no additional cost" → re:Post, Knowledge Center, Prescriptive Guidance, documentation (not Professional Services)</li>
<li>"AWS resources used for spam / abuse" → AWS Trust &amp; Safety</li>
</ul></div>
`,summary:["Support plans in the Exam Guide: Basic Support (free, every account), AWS Business Support+, AWS Enterprise Support, AWS Unified Operations; see the official page for details.","Open support cases in the AWS Support Center.","Trusted Advisor checks cost optimization, performance, security, fault tolerance, service limits and operational excellence.","AWS Health Dashboard and the Health API report incidents and maintenance that affect your resources.","re:Post is a Q&A community; Knowledge Center is ready-made answers; Prescriptive Guidance is strategies and patterns.","Professional Services are AWS's own experts (paid); the APN includes consulting/implementation partners and ISVs, who get training, recognized expertise and go-to-market support.","AWS Marketplace sells third-party software charged on your AWS bill; Private Marketplace limits users to a catalog of approved products.","Report abuse of AWS resources to AWS Trust & Safety."],terms:[["AWS Support plans","the customer support plans AWS offers"],["Basic Support","the free basic support plan"],["Support case","a request for help from AWS Support"],["AWS Support Center","where you open and track support cases"],["AWS Trusted Advisor","a tool that checks your account and gives recommendations"],["Service limits / quotas","the maximum amount of a resource you may use"],["AWS Health Dashboard","shows the status of AWS services and your resources"],["AWS re:Post","a Q&A community about AWS"],["AWS Knowledge Center","a library of answers to common questions"],["AWS Prescriptive Guidance","proven strategy guides and patterns"],["AWS Professional Services","AWS's own team of consulting experts"],["AWS Partner Network (APN)","the network of companies that partner with AWS"],["ISV (Independent Software Vendor)","a company that makes and sells its own software"],["AWS Marketplace","a store for third-party software on AWS"],["Private Marketplace","a catalog of Marketplace products approved by your company"],["AWS Trust & Safety","the team that handles abuse reports"]]};
})();
