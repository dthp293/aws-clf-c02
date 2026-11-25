(function(){var I=window.CLF_I18N=window.CLF_I18N||{};var L=I.en=I.en||{};['q','course','lessons','glossary','services','domains','ui'].forEach(function(k){L[k]=L[k]||{};});
L.course["3-8"]={title:"Databases on AWS",goals:["Understand what a database is and tell the types apart: relational, NoSQL, document, graph, in-memory, data warehouse","Know why you would use a managed database such as Amazon RDS instead of installing one yourself on EC2","Pick the right service: RDS, Aurora, DynamoDB, DocumentDB, Neptune, ElastiCache, Redshift","Tell OLTP from OLAP, and know that DMS and SCT are used to move databases to AWS"],html:`
<h3>1. What is a database? Why are there so many types?</h3>
<p>A <b>database</b> is a place that stores data in an organized way so software can find, add, change, and delete it very quickly. An Excel file stores data too, but when thousands of people place orders at the same moment, Excel cannot cope. A database is designed for exactly that.</p>
<p>Real-world data comes in many different "shapes", so databases come in many types too. No single type is best for everything. The CLF-C02 exam mainly tests whether you can <b>pick the right type for the right job</b>.</p>

<div class="box idea"><b>🧠 In plain terms</b><p>Think of the ways you store things at home: a <b>filing cabinet with clearly labeled drawers</b> (relational), <b>numbered storage boxes</b> you can grab instantly by number (key-value), <b>folders</b> that each hold one complete form (document), a <b>pinboard of photos linked with red string</b> like in a detective movie (graph), a <b>sticky note right on your desk</b> so you don't have to open the cabinet (in-memory cache), and a <b>storeroom holding years of account books</b> for the year-end review (data warehouse).</p></div>

<h4>The main database types</h4>
<ul>
<li><b>Relational database</b>: data lives in <b>tables</b> with fixed rows and columns, and the tables are linked to each other. For example, a Customers table links to an Orders table. You query it with the <b>SQL</b> language. It suits clearly structured data that must be absolutely accurate, such as orders and payments.</li>
<li><b>NoSQL</b> ("not only SQL"): does not force data into fixed tables, has a flexible structure, and scales to very large sizes. The most common kind is <b>key-value</b>: hand over a "key" (for example a cart ID) and you get the value back right away.</li>
<li><b>Document database</b>: a kind of NoSQL that stores each record as a JSON "document", and each document can have different fields. Take product descriptions: a cream cake has a "size", a box of cookies has a "box weight".</li>
<li><b>Graph database</b>: stores "points" and the "relationships" between them. It is very good at questions like "what do my friends' friends like to eat", fraud detection, and product recommendations.</li>
<li><b>In-memory database / cache</b> (data kept in RAM): RAM is much faster than a disk. It is used to temporarily hold data that is read often, so the application responds in an instant.</li>
<li><b>Data warehouse</b>: gathers data from many sources, keeps it long term, and is used for <b>analysis</b> and reporting, not for day-to-day selling.</li>
</ul>

<h3>2. Install a database on EC2 yourself, or use a managed service?</h3>
<p>There are two ways to run a database on AWS. The first: rent an <b>EC2</b> virtual server and install the database software yourself (MySQL, for example). You have full control, but you also look after everything: operating system patches, database upgrades, backups, standby copies, and watching for full disks.</p>
<p>The second: use a <b>managed</b> service, the classic one being <b>Amazon RDS</b> (Relational Database Service). AWS takes care of the hardware, installation, patching of the database software and the operating system underneath, and automatic backups. You only look after your data, your table design, access permissions, and query tuning.</p>
<div class="box idea"><b>🧠 In plain terms</b><p>Installing on EC2 yourself is like <b>keeping your own cow for milk</b>: full control, but you have to feed it and clean the barn every day. Using RDS is like <b>having milk delivered to your door</b>: you just use the milk, and someone else looks after the cow.</p></div>
<p>RDS supports many familiar "engines" (kinds of database software): MySQL, PostgreSQL, MariaDB, Oracle, Microsoft SQL Server, Db2, and Aurora. Three features come up often on the exam and are very easy to mix up:</p>
<table>
<tr><th>Feature</th><th>What it does</th><th>Use it when the question says</th></tr>
<tr><td><b>Multi-AZ</b></td><td>Keeps a synchronized <b>standby</b> copy in another AZ. If the primary fails, RDS <b>fails over automatically</b> to the standby.</td><td>high availability, automatic failover, AZ failure</td></tr>
<tr><td><b>Read replica</b></td><td>A <b>read-only</b> copy. The application sends read queries here to <b>take load off</b> the primary database.</td><td>read-heavy, offload read traffic, improve read performance</td></tr>
<tr><td><b>Automated backups</b></td><td>RDS backs up automatically every day and keeps the change logs, which allows a <b>point-in-time restore</b> (going back to an exact moment, for example 14:00) within the retention period. The result is <b>a new DB instance</b>.</td><td>accidentally deleted data, restore to a specific time</td></tr>
</table>
<div class="box trap"><b>⚠️ Common trap</b><p>If you delete data by accident, <b>Multi-AZ and read replicas cannot save you</b>, because the delete is copied to them right away. You need <b>backups / point-in-time restore</b>. On the other hand, to survive the failure of a whole AZ, choose <b>Multi-AZ</b>, not a read replica.</p></div>
<p>So when should you still <b>install a database on EC2 yourself</b>? When you need something RDS does not give you: access to the operating system, special OS configuration, third-party plugins, or an engine RDS does not support. In exchange, you handle patching, backups, and redundancy yourself.</p>

<h3>3. AWS database services</h3>
<h4>Amazon Aurora</h4>
<p>A relational database that AWS built for the cloud, <b>compatible with MySQL and PostgreSQL</b> (applications written for MySQL/PostgreSQL run on Aurora with few changes). Aurora delivers higher performance than standard MySQL/PostgreSQL and automatically keeps multiple copies of your data across multiple AZs. Aurora is managed through RDS. There is also <b>Aurora Serverless</b>, which scales automatically with load.</p>
<h4>Amazon DynamoDB</h4>
<p>A <b>NoSQL key-value and document</b> database that is <b>serverless</b> (there are no servers for you to manage), with <b>single-digit millisecond</b> response times (just a few milliseconds) at any scale. It suits shopping carts, login sessions, game leaderboards, and IoT data: things with huge traffic and a simple structure.</p>
<ul>
<li><b>On-demand capacity</b>: no need to predict traffic in advance; DynamoDB keeps up by itself when load spikes (a flash sale, for example) and charges for the reads and writes you actually make.</li>
<li><b>Global tables</b>: automatically replicate a table to <b>multiple Regions</b>, and <b>every Region accepts both reads and writes</b> (multi-active). Users in the US, Europe, and Asia all read and write in the Region nearest to them with low latency.</li>
</ul>
<h4>Amazon DocumentDB</h4>
<p>A document database that is <b>MongoDB-compatible</b> (MongoDB is a very popular open-source document database). A company already using MongoDB that wants a managed version on AWS chooses DocumentDB.</p>
<h4>Amazon Neptune</h4>
<p>A <b>graph</b> database. It suits social networks, product recommendations ("people who bought this cake also bought..."), fraud detection: data where the <b>relationships</b> matter more than each individual row.</p>
<h4>Amazon ElastiCache</h4>
<p>An <b>in-memory cache</b> service that supports the Valkey, Redis OSS, and Memcached engines. Put ElastiCache in front of a database to keep frequently requested results ready, taking load off the database and speeding up read-heavy applications. Because the data sits in RAM, responses are <b>sub-millisecond</b> (under 1 millisecond), which suits game leaderboards, login sessions, and other data that can be rebuilt from the main database if it is lost.</p>
<h4>Amazon Redshift</h4>
<p>AWS's <b>data warehouse</b>, used to run complex analytical queries over very large amounts of data (up to petabytes). This is a tool for the analytics team, not the database behind a shopping website.</p>

<div class="box example"><b>🍰 Example: BanhNgon Bakery</b><p>Minh designs the data for BanhNgon Bakery like this. Orders, customers, and payments must be accurate and tightly linked, so they go in <b>Aurora</b> (MySQL-compatible) because the old code was written for MySQL. The carts of thousands of simultaneous shoppers during the Mid-Autumn Festival are stored in <b>DynamoDB</b>. The cake catalog, where every product has different details, is stored in <b>DocumentDB</b> because the old team knows MongoDB. The "customers often buy together" feature uses <b>Neptune</b>. The "top 10 best-selling cakes" on the home page is kept ready in <b>ElastiCache</b> so the database isn't asked over and over. At year end, Lan wants to see 3 years of sales by branch for Hanoi, Ho Chi Minh City, and Japan: the data is loaded into <b>Redshift</b> for analysis.</p></div>

<h3>4. Comparison table, and OLTP vs. OLAP</h3>
<table>
<tr><th>Service</th><th>Type</th><th>Keywords in the question</th></tr>
<tr><td>Amazon RDS</td><td>Relational, managed</td><td>MySQL, PostgreSQL, Oracle, SQL Server; less administration work; Multi-AZ, read replica</td></tr>
<tr><td>Amazon Aurora</td><td>Relational, built by AWS</td><td>MySQL/PostgreSQL-compatible, high performance, built for the cloud</td></tr>
<tr><td>Amazon DynamoDB</td><td>NoSQL key-value/document, serverless</td><td>single-digit millisecond, any scale, NoSQL</td></tr>
<tr><td>Amazon DocumentDB</td><td>Document</td><td>MongoDB-compatible</td></tr>
<tr><td>Amazon Neptune</td><td>Graph</td><td>highly connected data, social network, relationships</td></tr>
<tr><td>Amazon ElastiCache</td><td>In-memory cache</td><td>caching, read-heavy, in-memory, Redis/Memcached</td></tr>
<tr><td>Amazon Redshift</td><td>Data warehouse</td><td>analytics, petabyte, OLAP, business intelligence</td></tr>
</table>
<p>Two abbreviations show up a lot:</p>
<ul>
<li><b>OLTP</b> (Online Transaction Processing): a great many small, fast, constant operations such as "add 1 order" or "take 1 box of cakes out of stock". Use RDS, Aurora, DynamoDB.</li>
<li><b>OLAP</b> (Online Analytical Processing): fewer queries, but each one is "big", scanning millions of rows to answer questions like "which month sold best over the last 3 years". Use Redshift.</li>
</ul>
<div class="box trap"><b>⚠️ Common trap</b><p>Seeing the word "relational" does not always mean RDS: if the question stresses <b>"analytics", "data warehouse", "petabyte"</b>, the answer is <b>Redshift</b>. When you see "NoSQL", think <b>DynamoDB</b> first, but if the word <b>"MongoDB"</b> appears, it is <b>DocumentDB</b>. ElastiCache is a <b>cache</b> that sits in front of a database; it does not replace the main database. And remember: with RDS, AWS patches the operating system and the database engine, but if you install on EC2 yourself, <b>you</b> do the patching.</p></div>

<h3>5. Moving databases to AWS: DMS and SCT</h3>
<p><b>AWS DMS</b> (Database Migration Service) copies data from an old database to a database on AWS. Its strength: the source database <b>keeps running normally</b> during the migration, and DMS can <b>continuously replicate</b> new changes, so downtime is very short.</p>
<p>If you migrate between two <b>different</b> kinds of database (for example Oracle to Aurora PostgreSQL), the table structure, data types, and code inside the database need to be "translated". That job belongs to <b>AWS SCT</b> (Schema Conversion Tool). The <b>schema</b> is the database's "blueprint": which tables it has, which columns, and of what type.</p>
<ul>
<li><b>Homogeneous migration</b> (same engine, for example on-premises PostgreSQL → RDS for PostgreSQL): the schema stays the same, so you only need <b>DMS</b>.</li>
<li><b>Heterogeneous migration</b> (different engines, for example Oracle → Aurora PostgreSQL): <b>SCT</b> converts the schema first, then <b>DMS</b> moves the data. (DMS now also has a DMS Schema Conversion feature, but the exam usually uses SCT as the answer.)</li>
</ul>
<div class="box idea"><b>🧠 In plain terms</b><p>Moving house to another country: <b>SCT</b> is the person who redraws your shelving plans to fit the new home's power outlets and dimensions; <b>DMS</b> is the truck that carries your things, one trip at a time, while you keep living in the old house.</p></div>
<div class="box exam"><b>🎯 What the exam asks</b><ul>
<li>"fully managed NoSQL, single-digit millisecond" → <b>DynamoDB</b></li>
<li>"MySQL and PostgreSQL compatible, built for the cloud, higher performance" → <b>Aurora</b></li>
<li>"MongoDB compatible" → <b>DocumentDB</b></li>
<li>"highly connected relationships / social network" → <b>Neptune</b></li>
<li>"caching, read-heavy, in-memory" → <b>ElastiCache</b></li>
<li>"complex analytical queries, petabytes, data warehouse" → <b>Redshift</b></li>
<li>"benefit of RDS over database on EC2" → AWS handles patching, backups, high availability; "needs OS access / unsupported plugin" → install it yourself on <b>EC2</b></li>
<li>"automatic failover to another AZ" → <b>Multi-AZ</b>; "offload read traffic" → <b>read replica</b>; "restore to a specific time" → <b>point-in-time restore</b></li>
<li>"multiple Regions, every Region accepts writes, low latency" → <b>DynamoDB global tables</b>; "unpredictable spikes, no capacity planning" → <b>DynamoDB on-demand</b></li>
<li>"migrate database with minimal downtime" → <b>DMS</b>; "convert the schema" between two different engines → <b>SCT</b></li>
</ul></div>
`,summary:["Relational (tables, SQL): RDS and Aurora. Aurora is MySQL/PostgreSQL-compatible with higher performance.","Serverless NoSQL key-value, a few milliseconds at any scale: DynamoDB (on-demand for unpredictable load, global tables for writes in multiple Regions). MongoDB-compatible: DocumentDB.","Graph (heavily interconnected relationships): Neptune. In-memory cache: ElastiCache. Data warehouse for analytics: Redshift.","Use RDS instead of installing on EC2 yourself: AWS handles installation, patching, backups, Multi-AZ. If you need OS access or an unusual plugin, install on EC2 yourself.","Multi-AZ = automatic failover (HA); read replica = spreads the read load; automated backups = point-in-time restore when data is deleted by accident.","OLTP = small, constant transactions (RDS, Aurora, DynamoDB). OLAP = large-scale analysis (Redshift).","DMS moves data with minimal downtime; SCT is only needed when switching to a different engine (schema conversion)."],terms:[["Relational database","a database that stores data in linked tables of rows and columns"],["NoSQL database","a non-relational database with a flexible structure"],["Key-value","data stored as a key that looks up a value"],["Document database","a database that stores each record as a JSON-like document"],["Graph database","a database that stores items and the relationships between them"],["In-memory cache","a temporary data store kept in RAM for speed"],["Data warehouse","a central store of data used for analysis and reporting"],["Managed service","a service where AWS handles the setup and upkeep for you"],["Read replica","a read-only copy of a database"],["Multi-AZ deployment","running across more than one Availability Zone"],["Point-in-time restore","recovering a database to a specific moment"],["Global tables","DynamoDB tables replicated across multiple Regions"],["OLTP","online transaction processing: many small, fast transactions"],["OLAP","online analytical processing: large analytical queries"],["Schema","the blueprint (structure) of a database"]]};
L.course["3-9"]={title:"Amazon VPC: your own private network in AWS",goals:["Understand what a VPC is and why resources such as EC2 and RDS all live inside a private network","Tell a public subnet from a private subnet, and know the roles of the route table, internet gateway, and NAT gateway","Recall the difference between a security group and a network ACL","Know what VPC peering, VPC endpoints (gateway endpoints for S3/DynamoDB), and VPC Flow Logs are used for"],html:`
<h3>1. Computer networks and IP addresses, kept really simple</h3>
<p>A <b>network</b> is a group of computers connected together to exchange data. Each machine on the network has an <b>IP address</b>, like a house number, so data knows where to go. For example, 10.0.1.25.</p>
<p>There are <b>public</b> IP addresses (anyone on the Internet can send to them) and <b>private</b> IP addresses (used only inside an internal network). At home, your phone and laptop use private IPs, and the Wi-Fi modem is the thing that actually talks to the Internet.</p>

<h3>2. Amazon VPC: a private compound with a guarded gate</h3>
<p><b>Amazon VPC</b> (Virtual Private Cloud) is a private, logically isolated network that you create in an AWS Region. You decide the IP address range, split the network into smaller parts, and set the routes and who may come and go. EC2 instances, RDS databases, and so on are all placed inside a VPC.</p>
<div class="box idea"><b>🧠 In plain terms</b><p>A VPC is like a <b>gated community with walls and a guarded gate</b>. Inside, it is divided into <b>blocks</b> (subnets). Some blocks face the main road to welcome visitors (public subnets), and some sit further in where strangers cannot walk straight in (private subnets). The <b>signposts</b> inside are the route table, the <b>main gate</b> to the main road is the internet gateway, each house has its <b>own guard</b> at the door (security group), and each block has a <b>checkpoint</b> at its entrance (network ACL).</p></div>
<p>A VPC lives in <b>one Region</b> but spans multiple Availability Zones. Every AWS account comes with a <b>default VPC</b> in each Region that you can use right away, but businesses usually create their own VPCs to their own design.</p>

<h3>3. Subnet, route table, internet gateway, NAT gateway</h3>
<h4>Subnet</h4>
<p>A <b>subnet</b> is a smaller part of a VPC, and each subnet sits entirely inside <b>one Availability Zone</b>. For good fault tolerance, create subnets in at least two AZs.</p>
<ul>
<li><b>Public subnet</b>: has a route out to the Internet through an internet gateway. Put things here that need to receive visitors from the Internet, such as a load balancer or web server.</li>
<li><b>Private subnet</b>: has no direct route in from the Internet. Put databases, internal processing servers, and anything that should not be exposed here.</li>
</ul>
<h4>Route table</h4>
<p>A <b>route table</b> is a list of rules saying "to reach address X, go through exit Y". Each subnet is associated with a route table. It is the route table that decides whether a subnet is public or private: a subnet with a route to an <b>internet gateway</b> is a public subnet.</p>
<h4>Internet gateway</h4>
<p>An <b>internet gateway</b> attaches to a VPC and lets resources in a public subnet (with a public IP) communicate both ways with the Internet. Without one, the VPC is completely cut off from the Internet.</p>
<p>For an EC2 instance to <b>receive connections from the Internet</b>, all of the following must be true (miss one and nothing gets in):</p>
<ol>
<li>The VPC has an <b>internet gateway</b> attached.</li>
<li>The subnet's route table has a <b>0.0.0.0/0</b> route (meaning "every other address") pointing to the internet gateway.</li>
<li>The instance has a <b>public IP</b> or an <b>Elastic IP</b> (a fixed public IP that you keep for yourself).</li>
<li>The security group and network ACL allow that traffic.</li>
</ol>
<h4>NAT gateway</h4>
<p>Instances in a private subnet sometimes need to go <b>out</b> to the Internet, for example to download software updates, but you do not want anyone from outside coming <b>in</b>. A <b>NAT gateway</b> (Network Address Translation) solves this. It sits in a public subnet; instances in the private subnet send requests out through the NAT gateway and the replies can come back, but connections started from the outside are blocked.</p>
<div class="flow"><span>Instance in a private subnet</span><span>NAT gateway (public subnet)</span><span>Internet gateway</span><span>Internet</span></div>
<div class="box idea"><b>🧠 In plain terms</b><p>A NAT gateway is like a <b>personal shopper</b>: people in the closed-off block ask him to go out, buy things, and bring them back, but the sellers at the market don't know whose house it is and can't come knocking on their own.</p></div>

<div class="box example"><b>🍰 Example: BanhNgon Bakery</b><p>Minh creates a VPC for BanhNgon Bakery in the Singapore Region, spread across 2 AZs. Each AZ has a <b>public subnet</b> holding the load balancer that receives customers ordering cakes, and a <b>private subnet</b> holding the EC2 instances that run the application along with the Aurora database. The public subnet's route table has a route to the <b>internet gateway</b>; the private subnet's route table does not, and only has a route out to the <b>NAT gateway</b> so the EC2 instances can download operating system patches. As a result, attackers on the Internet cannot knock directly on the database that holds customer information.</p></div>

<h3>4. Security groups and network ACLs (a recap from Domain 2)</h3>
<p>You met these two "firewall layers" in the security section (Domain 2). A <b>firewall</b> is a filter that decides which network traffic may pass. A quick recap:</p>
<table>
<tr><th></th><th>Security group</th><th>Network ACL (NACL)</th></tr>
<tr><td>Protects at the level of</td><td>Each resource (instance, ENI)</td><td>The whole subnet</td></tr>
<tr><td>Rule types</td><td><b>Allow</b> rules only</td><td>Both <b>allow</b> and <b>deny</b> rules</td></tr>
<tr><td>Remembers state</td><td><b>Stateful</b>: if traffic is allowed in, the response is automatically allowed out</td><td><b>Stateless</b>: inbound and outbound must be declared separately</td></tr>
<tr><td>Metaphor</td><td>A guard at the door of each house</td><td>A checkpoint at the entrance to the whole block</td></tr>
</table>
<div class="box trap"><b>⚠️ Common trap</b><p>To <b>block a specific IP address</b> (or a range of IPs) you must use a <b>network ACL</b>, because security groups have no deny rules. Because a NACL is <b>stateless</b>, if you open only the inbound direction (for example HTTPS on port 443) and forget the outbound direction, requests reach the server but <b>the replies cannot get back</b> (responses leave through the ephemeral ports 1024-65535). Security groups do not have this problem because they are stateful. And don't mix these up: a <b>subnet belongs to one AZ</b>, a <b>VPC belongs to one Region</b>. Also, a "public subnet" is not public because of its name, but because its route table has a route to an internet gateway.</p></div>

<h3>5. VPC peering, VPC endpoints, and VPC Flow Logs</h3>
<h4>VPC peering</h4>
<p><b>VPC peering</b> privately connects <b>two VPCs</b> so they can talk using private IPs as if they were one network, without going over the Internet. The two VPCs can be in different accounts, even different Regions. Note that peering is <b>non-transitive</b>: A peered with B and B peered with C does not mean A can talk to C. For A to talk to C, either create another peering connection <b>directly between A and C</b>, or connect them all to <b>AWS Transit Gateway</b> as a hub (covered in the next lesson). When only <b>two VPCs</b> need to talk to each other, peering is the <b>simplest and cheapest</b> option; with dozens or hundreds of VPCs, use Transit Gateway.</p>
<h4>VPC endpoints: reach AWS services without going out to the Internet</h4>
<p>Many AWS services such as S3 and DynamoDB sit <b>outside</b> your VPC. Normally an instance in a private subnet that wants to call S3 has to go through a NAT gateway out to the Internet, which is less private and also costs <b>NAT gateway data processing charges</b>. A <b>VPC endpoint</b> creates a private path from your VPC to the AWS service, and the traffic stays on the AWS network. There are two types:</p>
<ul>
<li><b>Gateway endpoint</b>: only for <b>Amazon S3 and DynamoDB</b>. It adds a route to the route table and is <b>free</b> to use. The exam often asks about it as a way to cut NAT gateway charges.</li>
<li><b>Interface endpoint</b> (powered by <b>AWS PrivateLink</b>): places a network interface with a private IP in your subnet to reach a great many other AWS services or partner services. It is charged per hour and per amount of data.</li>
</ul>
<h4>VPC Flow Logs</h4>
<p><b>VPC Flow Logs</b> record information about the IP traffic going into and out of network interfaces in a VPC: from which address, to which address, on which port, and whether it was accepted or rejected. This data is sent to CloudWatch Logs or S3 and helps with troubleshooting connectivity and with security. Amazon GuardDuty also analyzes Flow Logs to detect threats.</p>
<div class="box example"><b>🍰 Example: BanhNgon</b><p>When it opens its Japan branch, BanhNgon gets another VPC in the Tokyo Region. Minh uses <b>VPC peering</b> so the system in Tokyo can read product data from the Singapore VPC over the private network. The EC2 instances in the private subnet upload cake photos to S3 through a <b>gateway endpoint</b>, so the NAT gateway bill drops sharply. One day the website is unusually slow; Minh opens <b>VPC Flow Logs</b>, sees a large number of rejected connections from an unfamiliar IP range, and immediately adds a deny rule to the network ACL.</p></div>

<div class="box exam"><b>🎯 What the exam asks</b><ul>
<li>"logically isolated section of the AWS Cloud" → <b>Amazon VPC</b></li>
<li>"subnet whose route table has a route to an internet gateway" → <b>public subnet</b></li>
<li>"instances in a private subnet need outbound internet access" → <b>NAT gateway</b></li>
<li>"allow a VPC to communicate with the internet" → <b>internet gateway</b></li>
<li>"stateful, instance level" → <b>security group</b>; "stateless, subnet level, allow and deny" → <b>network ACL</b></li>
<li>"connect two VPCs privately, most cost-effective" → <b>VPC peering</b>; "A peered with B, B with C, A cannot reach C" → direct A-C peering or <b>Transit Gateway</b></li>
<li>"private subnet to S3 without NAT gateway, reduce NAT charges" → <b>gateway VPC endpoint</b></li>
<li>"instance not reachable from internet" → check the internet gateway, the 0.0.0.0/0 route, the public IP/Elastic IP</li>
<li>"responses never reach clients, NACL allows inbound" → the NACL is <b>stateless</b> and the outbound rule is missing</li>
<li>"capture information about IP traffic in a VPC" → <b>VPC Flow Logs</b></li>
</ul></div>
`,summary:["A VPC is a private, logically isolated network that lives in one Region; a subnet lives in one AZ.","A public subnet has a route to an internet gateway; a private subnet does not and is used for databases and internal servers.","A NAT gateway (placed in a public subnet) lets instances in a private subnet go out to the Internet but blocks connections coming in from outside.","Security group: stateful, instance level, allow only. Network ACL: stateless, subnet level, allow and deny.","VPC peering connects two VPCs over the private network and is non-transitive (you need direct peering or Transit Gateway).","Gateway VPC endpoint for S3/DynamoDB: traffic stays on the AWS network, skips the NAT gateway, and is free.","VPC Flow Logs record IP traffic information for troubleshooting and security."],terms:[["Virtual Private Cloud (VPC)","your own logically isolated private network in AWS"],["IP address","the numeric address of a device on a network"],["Subnet","a smaller section of a VPC, inside one AZ"],["Public subnet","a subnet with a route to an internet gateway"],["Private subnet","a subnet with no direct route from the Internet"],["Route table","a set of rules saying where network traffic goes"],["Internet gateway","the VPC's door to the Internet"],["NAT gateway","lets private instances reach out to the Internet, but not the reverse"],["Security group","an instance-level firewall"],["Network ACL","a subnet-level list of allow and deny rules"],["Stateful / Stateless","remembers connections / does not remember connections"],["VPC peering","a private connection between two VPCs"],["VPC endpoint (gateway / interface)","a private connection from a VPC to AWS services"],["Elastic IP address","a fixed public IP address"],["VPC Flow Logs","records of IP traffic in a VPC"]]};
L.course["3-10"]={title:"Connectivity and content delivery: Route 53, CloudFront, Global Accelerator, VPN, Direct Connect",goals:["Understand what DNS is and what Route 53 does","Tell CloudFront (a CDN with caching) from Global Accelerator (static IPs, the AWS network, no caching)","Tell Site-to-Site VPN, Client VPN, and Direct Connect apart","Know when to use Transit Gateway, PrivateLink, and API Gateway"],html:`
<h3>1. DNS and Amazon Route 53</h3>
<p>Computers find each other by IP address (a string of numbers), but people remember names like banhngon.vn. <b>DNS</b> (Domain Name System) is the service that "translates" a domain name into an IP address. When you type a domain name, your browser asks DNS "what address is this name at?" and only then connects.</p>
<div class="box idea"><b>🧠 In plain terms</b><p>DNS is the <b>phone book of the Internet</b>: you look up a name, and the phone book gives you the number to call.</p></div>
<p><b>Amazon Route 53</b> is AWS's DNS service, highly available and scalable. It does three main things:</p>
<ul>
<li><b>Domain registration</b>: buying and registering a domain name.</li>
<li><b>Answering DNS queries</b>: where a domain name points (a load balancer, CloudFront, S3...).</li>
<li><b>Health checks</b> (testing whether an endpoint is working) and <b>routing policies</b> (rules for directing traffic): deciding which address to return to each person who asks.</li>
</ul>
<table>
<tr><th>Routing policy</th><th>How it works</th><th>Use it when</th></tr>
<tr><td><b>Simple</b></td><td>One domain name points to one destination, with no health check</td><td>A simple website on one server</td></tr>
<tr><td><b>Weighted</b></td><td>Splits traffic by <b>proportion</b> (for example 90% to the old version, 10% to the new one)</td><td>Testing a new version, splitting load by percentage</td></tr>
<tr><td><b>Latency</b></td><td>Sends users to the Region with the <b>lowest latency</b> for them</td><td>The application runs in multiple Regions and you want the fastest one</td></tr>
<tr><td><b>Failover</b></td><td><b>Active-passive</b>: uses the primary system while its health check passes, and switches automatically to the standby (for example a static maintenance page on S3) when it fails</td><td>Disaster recovery, a backup site</td></tr>
<tr><td><b>Geolocation</b></td><td>Answers based on the <b>country/continent</b> the user's query comes from</td><td>Different content per country (licensing, language, law)</td></tr>
</table>
<p>There are a few other policies, such as geoproximity and multivalue answer, that rarely appear on the exam. Also remember: <b>Elastic Load Balancing only distributes load within one Region</b>; to choose between <b>multiple Regions</b> (by latency, or to skip a failing Region), use <b>Route 53</b>.</p>
<div class="box trap"><b>⚠️ Common trap</b><p><b>Latency</b> chooses by network speed, <b>geolocation</b> chooses by the user's location. If the question says "depending on the country" or "licensing by country" → geolocation, not latency. If the question says "switch to the backup when the health check fails" → failover, not weighted.</p></div>

<h3>2. Getting content to users faster: CloudFront and Global Accelerator</h3>
<h4>Amazon CloudFront</h4>
<p>Users far from the server load pages slowly, because the data has a long way to travel. A <b>CDN</b> (Content Delivery Network) solves this by keeping copies (a <b>cache</b>) of the content at many points close to users. <b>Amazon CloudFront</b> is AWS's CDN; those points are called <b>edge locations</b>, and they are in a great many cities around the world, far more than the number of Regions.</p>
<p>The first time someone in Tokyo views a cake photo, CloudFront fetches the photo from the source server (the <b>origin</b>, for example an S3 bucket) and keeps it at the Tokyo edge location. Later viewers in Tokyo get the photo straight from there, much faster. CloudFront also works with AWS Shield and AWS WAF to defend against attacks. When the origin is an S3 bucket, use <b>origin access control</b> (OAC) so the bucket stays <b>private</b>: only CloudFront can read the bucket, and users cannot go straight to S3 but must go through CloudFront.</p>
<div class="box idea"><b>🧠 In plain terms</b><p>CloudFront is like placing <b>cake display cases in convenience stores</b> everywhere: customers don't have to travel all the way to the bakery but buy right at the store near home.</p></div>
<h4>AWS Global Accelerator</h4>
<p><b>AWS Global Accelerator</b> gives your application <b>two static IP addresses</b> (they never change) for worldwide use, of the <b>anycast</b> kind (the same IP is "announced" from many edge locations at once). It supports both TCP and <b>UDP</b> traffic. Users connect to the nearest edge location, and then the traffic travels over <b>AWS's own private global network</b> (instead of the crowded public Internet) to the application in the appropriate Region. If a Region has a problem, it redirects to a healthy Region very quickly.</p>
<div class="box trap"><b>⚠️ Common trap</b><p>Both use edge locations, but <b>CloudFront caches content</b> (good for images, video, web pages), while <b>Global Accelerator does not cache</b>; it only "carries" traffic along a faster route and provides <b>static IPs</b> (good for games, TCP/UDP applications, systems that need fixed IPs). If the question mentions "static IP addresses" or "AWS global network" without mentioning caching → Global Accelerator.</p></div>

<h3>3. Connecting an office or data center to AWS: VPN and Direct Connect</h3>
<p>Many companies still have systems in their own office or <b>data center</b> (called <b>on-premises</b>) and need to connect them to a VPC on AWS. Three options are commonly tested:</p>
<ul>
<li><b>AWS Site-to-Site VPN</b>: creates an <b>encrypted</b> "tunnel" between the office network and the VPC, running over the <b>public Internet</b>. Quick and cheap to set up. Speed depends on the Internet, so it can be inconsistent at times.</li>
<li><b>AWS Client VPN</b>: lets <b>individual employees</b> connect securely from their own laptops (at home, in a coffee shop) to the VPC. Site-to-Site connects a whole network; Client VPN connects individual people.</li>
<li><b>AWS Direct Connect</b>: a <b>dedicated physical line</b> from your data center to AWS that <b>does not go over the public Internet</b>. High bandwidth and consistent latency, but it takes time to install (usually several weeks or more) and costs more.</li>
</ul>
<p>With Site-to-Site VPN, each end of the tunnel has a "gateway": on the office side is the <b>customer gateway</b> (your device/router), and on the AWS side is the <b>virtual private gateway</b> attached to the VPC (or a Transit Gateway when connecting many VPCs).</p>
<p>A very common design: use <b>Direct Connect as the primary link</b> and <b>Site-to-Site VPN as the backup link</b>. The VPN is cheap, quick to set up over an existing Internet connection, and encrypted; when Direct Connect goes down, traffic switches to the VPN. (Adding a second Direct Connect line is more resilient but more expensive and slower to deploy.)</p>
<div class="box idea"><b>🧠 In plain terms</b><p>Site-to-Site VPN is like an <b>armored truck driving on the shared public highway</b>: safe thanks to its shell (encryption), but it can still get stuck in traffic. Direct Connect is like a <b>private road only you may use</b>: clear and consistent, but it takes effort to build. Client VPN is like a <b>personal access card</b> for each employee.</p></div>

<h3>4. Transit Gateway, PrivateLink, and API Gateway</h3>
<p><b>AWS Transit Gateway</b> is a <b>central transit hub</b>. Instead of connecting each pair of VPCs with peering (with 10 VPCs you would need a great many pairs), every VPC and on-premises network just connects to the Transit Gateway. It is like a <b>central bus station</b>: every route comes into the station and you change buses there.</p>
<p><b>AWS PrivateLink</b> lets you reach <b>one specific service</b> in another VPC (yours, a partner's, or an AWS service) privately, through a <b>VPC endpoint</b>, without the traffic going out to the Internet. It differs from peering: peering connects two whole networks, while PrivateLink opens exactly one "service door".</p>
<p><b>Amazon API Gateway</b> helps you create, publish, secure, and monitor <b>APIs</b>. An <b>API</b> (Application Programming Interface) is the "doorway" one program uses to call another, for example a phone app calling the ordering system. API Gateway often sits in front of Lambda as the "front door" for serverless applications.</p>

<div class="box example"><b>🍰 Example: BanhNgon Bakery</b><p>Lan buys the domain name banhngon.vn for BanhNgon Bakery (through a Vietnamese domain registrar, because Route 53 does not sell the .vn extension) and then uses <b>Route 53</b> for DNS, with a latency policy so Japanese customers reach the Tokyo Region and Vietnamese customers reach Singapore. Cake-making photos and videos are delivered through <b>CloudFront</b>. The real-time "lucky wheel" game uses <b>Global Accelerator</b> to run smoothly. The bakery workshop in Hanoi has an on-premises inventory management server: at first it connects to AWS with <b>Site-to-Site VPN</b>, and when the data volume grows it switches to <b>Direct Connect</b>. Accounting staff working from home use <b>Client VPN</b>. The cake-ordering app calls the system through <b>API Gateway</b> in front of the Lambda functions. When the number of VPCs grows past a dozen, Minh uses <b>Transit Gateway</b> as the hub. The delivery partner accesses BanhNgon's "order lookup" service through <b>PrivateLink</b>, with no exposure to the Internet.</p></div>

<h3>5. The "what you need → what to use" table</h3>
<table>
<tr><th>Need</th><th>Service</th></tr>
<tr><td>Domain registration, DNS, latency-based routing, failover</td><td>Amazon Route 53</td></tr>
<tr><td>Cache static content/video close to users worldwide (CDN)</td><td>Amazon CloudFront</td></tr>
<tr><td>Global static IPs, traffic over the AWS network, no caching</td><td>AWS Global Accelerator</td></tr>
<tr><td>A quick, encrypted connection over the Internet between an office and a VPC</td><td>AWS Site-to-Site VPN</td></tr>
<tr><td>Remote employees connecting from laptops to a VPC</td><td>AWS Client VPN</td></tr>
<tr><td>A dedicated line, not over the Internet, high bandwidth, consistent</td><td>AWS Direct Connect</td></tr>
<tr><td>A hub connecting hundreds of VPCs and on-premises networks</td><td>AWS Transit Gateway</td></tr>
<tr><td>Privately connecting two VPCs</td><td>VPC peering</td></tr>
<tr><td>Private access to one service in another VPC, without going out to the Internet</td><td>AWS PrivateLink</td></tr>
<tr><td>Creating and managing APIs, a front door for Lambda</td><td>Amazon API Gateway</td></tr>
</table>
<div class="box exam"><b>🎯 What the exam asks</b><ul>
<li>"highly available and scalable DNS" → <b>Route 53</b></li>
<li>"cache content at edge locations, reduce latency globally" → <b>CloudFront</b></li>
<li>"static IP, route traffic over AWS global network" → <b>Global Accelerator</b></li>
<li>"dedicated private connection, not over the public internet" → <b>Direct Connect</b></li>
<li>"quickly establish encrypted connection over the internet" → <b>Site-to-Site VPN</b>; "AWS side of the VPN attached to the VPC" → <b>virtual private gateway</b></li>
<li>"inexpensive, encrypted backup for Direct Connect" → <b>Site-to-Site VPN</b></li>
<li>"route to lowest-latency Region" → <b>latency routing</b>; "send users to backup when health check fails" → <b>failover routing</b>; "different content by country" → <b>geolocation routing</b>; "split traffic by percentage" → <b>weighted routing</b></li>
<li>"keep S3 bucket private, serve only through CloudFront" → <b>origin access control (OAC)</b></li>
<li>"individual remote employees from laptops" → <b>Client VPN</b></li>
<li>"central hub for many VPCs" → <b>Transit Gateway</b>; "privately access services in another VPC" → <b>PrivateLink</b></li>
<li>"create, publish, secure APIs" → <b>API Gateway</b></li>
</ul></div>
`,summary:["Route 53 = DNS: domain registration, health checks, routing policies: latency (fastest), failover (backup), weighted (by proportion), geolocation (by country).","CloudFront = CDN, caches content at edge locations close to users.","Global Accelerator = 2 static IPs, traffic over AWS's global network, no caching.","Site-to-Site VPN: encrypted over the Internet, quick, cheap, often the backup for Direct Connect. Client VPN: for individual users. Direct Connect: a dedicated line, not over the Internet.","Transit Gateway is the central hub for many VPCs; PrivateLink gives private access to one service in another VPC.","API Gateway creates and secures APIs, and often sits in front of Lambda."],terms:[["Domain Name System (DNS)","the system that turns domain names into IP addresses"],["Routing policy","a rule for how DNS directs traffic"],["Health check","a test of whether an endpoint is working"],["Content Delivery Network (CDN)","a network that caches content close to users"],["Edge location","a site close to users where content is cached"],["Origin","the source server that holds the original content"],["Static IP address","an IP address that does not change"],["On-premises","infrastructure in a company's own office or data center"],["Virtual Private Network (VPN)","an encrypted tunnel over the Internet"],["Dedicated connection","a private physical link used only by you"],["Hub","a central connection point"],["VPC endpoint","a private connection from a VPC to a service"],["Virtual private gateway / customer gateway","the VPN gateway on the AWS side / on the customer side"],["Failover","automatic switching to a standby system"],["API","an interface programs use to call each other"]]};
L.course["3-11"]={title:"Application integration and other service groups",goals:["Understand what decoupling (separating components) is and why it matters","Tell SQS, SNS, EventBridge and Step Functions apart","Know the services for businesses (Connect, SES), developers (CodeBuild, CodePipeline, X-Ray, CLI) and end-user computing (WorkSpaces, AppStream 2.0 (now WorkSpaces Applications), WorkSpaces Secure Browser)","Know when to use Amplify and IoT Core"],html:`
<h3>1. Decoupling: don't let the parts stick tightly together</h3>
<p>An application usually has many parts: one takes orders, one handles payment, one sends emails, one notifies the kitchen. If the parts call each other directly and have to wait for each other, they are <b>tightly coupled</b>. When one part is slow or broken, the whole chain stops with it.</p>
<p><b>Decoupling</b> means letting the parts talk indirectly through a "middleman", so each part runs at its own pace. If one part fails, the others keep running, and each part can scale on its own. This is a design principle AWS brings up very often.</p>
<div class="box idea"><b>🧠 In plain terms</b><p>In a restaurant, the cashier does not run into the kitchen and wait for the chef to finish each dish. They <b>pin the order ticket on the ticket rail</b>, and the kitchen works through the tickets one by one. When it gets busy, tickets line up and wait, and no order is lost. That ticket rail is the "queue".</p></div>

<h3>2. SQS, SNS, EventBridge, Step Functions</h3>
<h4>Amazon SQS (Simple Queue Service)</h4>
<p><b>SQS</b> is a <b>message queue</b> service. One side puts messages into the queue, and the other side <b>pulls them out</b> to process when it is free. Messages are kept safely until they are processed. Each message is normally processed by only <b>one</b> consumer. That makes SQS an ideal <b>buffer</b> when the sender creates work faster than the processor can keep up: no work is lost, and the processor works at its own pace.</p>
<table>
<tr><th></th><th>SQS Standard queue</th><th>SQS FIFO queue</th></tr>
<tr><td>Ordering</td><td>Tries to keep the order (best-effort), but it can be off</td><td><b>Exactly the order sent</b> (First-In-First-Out)</td></tr>
<tr><td>Duplicates</td><td>Each message is delivered <b>at least once</b>, and occasionally delivered twice</td><td>Processed <b>exactly once</b>, duplicates are removed automatically</td></tr>
<tr><td>Throughput</td><td>Nearly unlimited</td><td>Limited, lower than Standard</td></tr>
<tr><td>Use when</td><td>The default for most work</td><td>Trade orders, payments: order matters and nothing may be done twice</td></tr>
</table>
<h4>Amazon SNS (Simple Notification Service)</h4>
<p><b>SNS</b> follows the <b>publish/subscribe</b> model (pub/sub for short). One side "publishes" a notification to a <b>topic</b>, and SNS immediately <b>pushes</b> it to <b>all</b> subscribers: email, SMS, mobile push notifications, Lambda functions, SQS queues... One message, many receivers at the same time (this is called <b>fan-out</b>). A common pattern: <b>SNS → several SQS queues</b>, where each downstream system has its own queue, receives the same message, but processes it independently.</p>
<div class="box idea"><b>🧠 In plain terms</b><p><b>SQS</b> is the order ticket rail: tickets wait there, and each ticket is picked up by one chef. <b>SNS</b> is the loudspeaker: say it once, and everyone who signed up to listen hears it right away.</p></div>
<h4>Amazon EventBridge</h4>
<p><b>EventBridge</b> is a serverless <b>event bus</b> (a central channel that carries events). An <b>event</b> is "something that just happened", for example "a new file arrived in S3", "an order was just paid", or an event from an outside SaaS application. You set up a <b>rule</b> such as "if an event of type X arrives, send it to target Y". In addition, <b>Amazon EventBridge Scheduler</b> is a serverless scheduler: it runs a task <b>on a schedule</b> (once or recurring, cron-style), for example "call a Lambda function at 1 a.m. every day to clean up temporary data", with no server to set up just to keep time.</p>
<h4>AWS Step Functions</h4>
<p><b>Step Functions</b> coordinates many steps into a visual <b>workflow</b> with a diagram: when step 1 finishes, do step 2; if there is an error, retry; if it fails, take another branch. It fits when you need to combine several Lambda functions and services into a process with a clear order.</p>
<table>
<tr><th>Service</th><th>Model</th><th>Keywords on the exam</th></tr>
<tr><td>SQS</td><td>Queue, the receiver pulls messages</td><td>queue, decouple, buffer, messages stored until processed</td></tr>
<tr><td>SNS</td><td>Pub/sub, pushes to many destinations</td><td>publish/subscribe, notifications, email, SMS, fan-out</td></tr>
<tr><td>EventBridge</td><td>Event bus, routes by rules; Scheduler runs on a schedule</td><td>event bus, route events, SaaS, schedule, cron</td></tr>
<tr><td>Step Functions</td><td>Stateful workflow</td><td>orchestrate, visual workflow, retries, error handling</td></tr>
</table>
<div class="box trap"><b>⚠️ Common trap</b><p>SQS and SNS are both "messaging", so they are easy to mix up. Remember: <b>SQS = Queue (line up, wait)</b>, <b>SNS = Notification (notify, push right away, many receivers)</b>. If the question says "workflow", "orchestrate", "coordinate multiple Lambda functions", that is <b>Step Functions</b>, not SQS. "Exact order", "no duplicates" → <b>SQS FIFO</b>. And SNS can send simple notification emails, but <b>high-volume marketing/transactional</b> email is the job of <b>SES</b>.</p></div>

<div class="box example"><b>🍰 Example: BanhNgon Bakery</b><p>When a customer orders a cake, the system puts the order into <b>SQS</b>; the bakery workshop pulls orders out and works through them, so even when orders pile up at the Mid-Autumn Festival, none is lost. When an order is paid, a notification is published to an <b>SNS</b> topic: Lan gets an SMS and the delivery team gets an email, at the same time. Every morning at 6 a.m., <b>EventBridge</b> triggers a function that summarizes the day's orders. The process "receive order → check stock → charge payment → schedule delivery" is built with <b>Step Functions</b>, which retries automatically if the payment step hits a network error.</p></div>

<h3>3. Business applications and developer tools</h3>
<h4>Business applications</h4>
<ul>
<li><b>Amazon Connect</b>: set up a <b>contact center</b> (a customer service call center) in the cloud that takes calls and chats, with no physical phone system to buy.</li>
<li><b>Amazon SES</b> (Simple Email Service): send email in bulk, both marketing email and transactional email such as order confirmations.</li>
</ul>
<h4>Developer tools</h4>
<p>First, <b>CI/CD</b> (continuous integration / continuous delivery) is a way of building software where every time a developer changes the code, the system automatically checks it, packages it and puts it into production, instead of doing this by hand.</p>
<ul>
<li><b>AWS CodeBuild</b>: <b>compiles code, runs tests</b>, and produces a software package ready to deploy.</li>
<li><b>AWS CodePipeline</b>: builds the whole <b>CI/CD pipeline</b>, automatically connecting the steps get code → build → test → deploy.</li>
<li><b>AWS X-Ray</b>: <b>tracing</b> (following the trail of) a request as it passes through many components (API Gateway → Lambda functions → DynamoDB, or many microservices), to find where it is slow or failing. Don't mix them up: CloudTrail records <b>who called which API</b> in the account, X-Ray follows <b>the path of a request</b> inside the application.</li>
<li><b>AWS CLI</b> (Command Line Interface): control AWS with <b>typed commands</b> in a command-line window, handy for automating with scripts. (To call AWS from code written in Python, Java... you use the <b>AWS SDK</b>.)</li>
</ul>
<p class="small"><i>Note on exam scope: the current CLF-C02 In-Scope AWS Services list (checked November 2026) only keeps CLI, CodeBuild, CodePipeline and X-Ray in the Developer Tools group. Services such as <b>AWS CodeCommit, CodeDeploy, CodeArtifact, Cloud9, CodeStar</b>, as well as <b>AWS Snow Family, AWS Transfer Family</b> and <b>AWS DataSync</b> in the migration group, are no longer on this list. Third-party practice exams (especially older sets) may still mention them: know them roughly so you are not confused, but you do not need to study them in depth.</i></p>

<h3>4. End-user computing, Amplify and IoT Core</h3>
<h4>End-user computing</h4>
<ul>
<li><b>Amazon WorkSpaces</b>: provides Windows or Linux <b>virtual desktops</b>. Employees sign in from any device and see a complete "computer".</li>
<li><b>Amazon AppStream 2.0</b> (now <b>Amazon WorkSpaces Applications</b>, renamed in November 2025; <b>the Exam Guide and the exam use the old name AppStream 2.0</b>): <b>streams one specific application</b> to the user's browser, without handing out a whole computer.</li>
<li><b>Amazon WorkSpaces Secure Browser</b> (formerly WorkSpaces Web): gives employees a <b>secure browser</b> for reaching internal websites, and no data stays behind on personal devices.</li>
</ul>
<h4>AWS Amplify</h4>
<p><b>Amplify</b> helps frontend (the user interface part) and mobile developers quickly <b>build, deploy and host</b> full-stack web/mobile applications, with sign-in, storage and APIs ready to use.</p>
<h4>AWS IoT Core</h4>
<p><b>IoT</b> (Internet of Things) means devices such as sensors and machines that are connected to a network. <b>AWS IoT Core</b> securely connects billions of such devices to the cloud and routes their data to other AWS services.</p>
<div class="box example"><b>🍰 Example: BanhNgon</b><p>BanhNgon opens a cake-ordering call center with <b>Amazon Connect</b> and sends order confirmation emails with <b>SES</b>. Minh's team uses <b>CodePipeline</b> + <b>CodeBuild</b> so that every code change is automatically tested and released; they use <b>X-Ray</b> to track down a slow payment step. An accountant working in Japan uses <b>WorkSpaces</b>; the bakers only need the recipe calculation software, so they use <b>WorkSpaces Applications</b> (AppStream 2.0). The cake-ordering app is built with <b>Amplify</b>. Ovens fitted with temperature sensors send data back through <b>IoT Core</b> to raise an alert when they get too hot.</p></div>
<div class="box exam"><b>🎯 What the exam asks</b><ul>
<li>"decouple, messages stored in a queue" → <b>SQS</b>; "publish/subscribe, email, SMS" → <b>SNS</b></li>
<li>"serverless event bus, route events based on rules" → <b>EventBridge</b>; "run a Lambda function every night at 01:00" → <b>EventBridge Scheduler</b></li>
<li>"exact order, processed exactly once" → <b>SQS FIFO</b>; "same message to several systems at once" → <b>SNS</b> (fan-out, usually SNS → several SQS queues)</li>
<li>"coordinate Lambda functions in a visual workflow" → <b>Step Functions</b></li>
<li>"cloud contact center" → <b>Connect</b>; "send marketing and transactional emails" → <b>SES</b></li>
<li>"compile code, run tests" → <b>CodeBuild</b>; "automate build, test, deploy (CI/CD)" → <b>CodePipeline</b>; "trace requests, find bottlenecks" → <b>X-Ray</b></li>
<li>"virtual desktops" → <b>WorkSpaces</b>; "stream a desktop application to browser" → <b>AppStream 2.0</b> (now WorkSpaces Applications; the exam uses the old name)</li>
<li>"frontend/mobile developers build and host full-stack apps" → <b>Amplify</b>; "connect IoT devices" → <b>IoT Core</b></li>
</ul></div>
`,summary:["Decoupling: components communicate through a middleman, so one failing part does not drag down the whole system.","SQS = queue (pull, keeps messages until processed). SNS = pub/sub (push to many receivers).","SQS Standard: nearly unlimited throughput, at-least-once; SQS FIFO: exact order, exactly-once.","EventBridge = event bus that routes events by rules; EventBridge Scheduler = runs tasks on a schedule. Step Functions = visual workflow with retries.","CodeBuild = build and test; CodePipeline = CI/CD pipeline; X-Ray = trace requests; CLI = control AWS with commands.","WorkSpaces = full virtual desktop; AppStream 2.0 (now WorkSpaces Applications, the exam uses the old name) = stream one application; WorkSpaces Secure Browser = secure browser.","Connect = cloud contact center; SES = bulk email sending; Amplify = build and host full-stack web/mobile apps; IoT Core = connect IoT devices."],terms:[["Decoupling","separating components so they do not depend directly on each other"],["Message queue","a line where messages wait until they are processed"],["FIFO (First-In-First-Out)","first in, first out: handled in the exact order sent"],["Publish/subscribe (pub/sub)","one side publishes a message, all subscribers receive it"],["Topic","the channel in SNS that messages are published to"],["Fan-out","one message delivered to many destinations"],["Event bus","a central channel that receives and routes events"],["Workflow","a multi-step process"],["Contact center","a customer service call center"],["CI/CD","continuous integration / continuous delivery: automated build, test and release"],["Tracing","following a request as it moves through a system"],["Command Line Interface (CLI)","a tool you control by typing commands"],["Virtual desktop","a desktop computer that runs in the cloud"],["Application streaming","delivering an app to a user's screen from a remote server"],["Internet of Things (IoT)","network-connected devices such as sensors and machines"]]};
L.course["3-12"]={title:"AI and Machine Learning on AWS",goals:["Understand in plain words what AI, machine learning and generative AI are","Tell SageMaker AI (build your own models) apart from the ready-made AI services","Remember what Rekognition, Textract, Comprehend, Translate, Transcribe, Polly, Lex and Amazon Q (Business, Developer) do","Have memory tricks for picking the right service on the exam"],html:`
<h3>1. What are AI, Machine Learning and Generative AI?</h3>
<p><b>AI</b> (Artificial Intelligence) is the broad idea: getting computers to do things that normally need human intelligence, such as looking at images, listening to speech and understanding written language.</p>
<p><b>Machine Learning</b> (ML) is one way to achieve AI: instead of programming every rule, we show the machine <b>a great many examples</b> so it works out the patterns by itself. The result of that learning process is a <b>model</b>. The process of letting the machine learn is called <b>training</b>; using the model to make predictions on new cases is called <b>inference</b>.</p>
<p><b>Generative AI</b> is the kind of AI that can <b>create new content</b>: write text, answer questions, write code, generate images. Today's conversational chatbots are an example.</p>
<div class="box idea"><b>🧠 In plain terms</b><p>To teach a child to recognize a cat, you don't explain "a cat has 4 legs, pointy ears...". You just show the child lots and lots of cat pictures. Little by little the child recognizes cats without help. That is <b>machine learning</b>. And when the child grows up and can <b>draw</b> a new cat never seen before, that is like <b>generative AI</b>.</p></div>

<h3>2. Two paths: build your own model or use a ready-made service</h3>
<p><b>Amazon SageMaker AI</b> is a platform for <b>data scientists</b> (people who analyze data and build models) and ML engineers to <b>build, train and deploy</b> their own models at scale. Use it when the problem is very specific, for example predicting how many cakes to bake each day based on the shop's own sales data.</p>
<p>But most companies have no ML experts. AWS offers many ready-made <b>AI services</b> that are already trained: you just call them, send an image, some text or some audio, and get a result back. You don't need to know anything about ML.</p>
<div class="box idea"><b>🧠 In plain terms</b><p>SageMaker AI is like <b>renting a kitchen and ingredients to invent your own new cake recipe</b>. The ready-made AI services are like <b>buying a finished cake</b>: no baking skills needed, just open the box and eat.</p></div>

<h3>3. The ready-made AI services</h3>
<ul>
<li><b>Amazon Rekognition</b>: analyzes <b>images and video</b>, recognizing objects, faces, text in images, activities, and doing <b>content moderation</b> (automatically flagging sensitive or violent content before it is posted).</li>
<li><b>Amazon Textract</b>: <b>extracts text</b>, handwriting, <b>tables</b> and <b>form data</b> from scanned documents and photos of paperwork. It goes beyond ordinary "text reading" because it understands the structure of tables and form fields.</li>
<li><b>Amazon Comprehend</b>: <b>understands text</b> (NLP, natural language processing) that is already in written form: it detects positive or negative feeling (<b>sentiment</b>), extracts <b>entities</b> (names of people, products, places) and <b>key phrases</b> (the important phrases), detects the language, finds personal information (PII), and classifies text by topic. Comprehend <b>does not read text from images</b> and <b>does not translate</b>.</li>
<li><b>Amazon Translate</b>: <b>translates</b> text between languages.</li>
<li><b>Amazon Transcribe</b>: turns <b>speech into text</b> (speech-to-text), for example writing down call center calls as text.</li>
<li><b>Amazon Polly</b>: turns <b>text into natural-sounding speech</b> (text-to-speech).</li>
<li><b>Amazon Lex</b>: builds <b>chatbots</b> and conversational interfaces with both voice and text. (Lex uses the same technology as the Alexa assistant.)</li>
<li><i>Amazon Kendra</i> (not on the Exam Guide's service list; just know it so you don't get confused): intelligent search across a company's internal documents.</li>
<li><b>Amazon Q</b>: a ready-to-use <b>generative AI assistant</b>, with no need to build or train a model yourself. Two versions often show up on the exam:
<ul>
<li><b>Amazon Q Business</b>: connects to the company's data sources (wikis, policies, document repositories, SaaS applications) so employees can <b>ask questions in natural language</b>, summarize and create content.</li>
<li><b>Amazon Q Developer</b>: helps <b>developers</b>: suggests and writes code, explains code, troubleshoots errors, and answers questions about AWS.</li>
<li><i>Current status (does not affect exam content): Amazon Q Business is no longer accepting new customers (AWS suggests moving to Amazon Quick, now AWS Quick); the Amazon Q Developer IDE plugins reach end of support on April 30, 2027, replaced by <b>Kiro</b>. The exam still asks according to the descriptions above.</i></li>
</ul></li>
</ul>
<p>These services are often <b>chained together</b>. For example, a scanned insurance form in Spanish: Textract (get the text) → Translate (translate to English) → Comprehend (sentiment, key phrases). Or a call center: Transcribe (speech → text) → Translate → Polly (read the answer aloud). "Choose THREE" questions love this pattern: break the problem into "input → output" steps.</p>
<div class="box example"><b>🍰 Example: BanhNgon Bakery</b><p>BanhNgon has grown, and Lan wants to "have AI". Minh applies the services one by one: <b>Rekognition</b> checks the photos customers upload to the reviews section and filters out inappropriate ones. <b>Textract</b> reads paper invoices from the flour and butter suppliers and enters them into the system automatically. <b>Comprehend</b> analyzes thousands of reviews to see whether customers are praising or complaining. <b>Translate</b> translates the cake descriptions into Japanese for the Tokyo branch. <b>Transcribe</b> turns cake-order phone calls into text for the records. <b>Polly</b> reads out the "your order is ready" notice in the app. <b>Lex</b> powers the cake-ordering chatbot on the website. Minh's team uses <b>Amazon Q</b> to ask questions about internal documents and to help write code. As for the model that predicts how many cakes to bake each day, Minh trains it himself on <b>SageMaker AI</b>.</p></div>

<h3>4. Memory tricks and summary table</h3>
<ul>
<li><b>Rekognition</b>: "recognize" → looks at images and video.</li>
<li><b>Textract</b>: "text + extract" = pull text out of documents.</li>
<li><b>Comprehend</b>: "comprehend" = to understand → understands the meaning and sentiment of text.</li>
<li><b>Transcribe</b>: "writes down" speech as text. <b>Polly</b>: a parrot (polly) that can talk → text into speech.</li>
<li><b>Lex</b>: a sibling of Alexa → conversation, chatbots.</li>
</ul>
<table>
<tr><th>Input → output</th><th>Service</th></tr>
<tr><td>Image/video → objects, faces, activities</td><td>Rekognition</td></tr>
<tr><td>Scanned document → text, tables, forms</td><td>Textract</td></tr>
<tr><td>Text → sentiment, topics, entities</td><td>Comprehend</td></tr>
<tr><td>Text in language A → language B</td><td>Translate</td></tr>
<tr><td>Speech → text</td><td>Transcribe</td></tr>
<tr><td>Text → speech</td><td>Polly</td></tr>
<tr><td>Conversation → chatbot</td><td>Lex</td></tr>
<tr><td>Q&amp;A over company data (Q Business), coding help (Q Developer) using generative AI</td><td>Amazon Q</td></tr>
<tr><td>Build, train and deploy your own ML models</td><td>SageMaker AI</td></tr>
</table>
<div class="box trap"><b>⚠️ Common trap</b><p><b>Transcribe</b> and <b>Polly</b> go in opposite directions: Transcribe is speech → text, Polly is text → speech. <b>Textract</b> reads text in <b>documents</b>; <b>Rekognition</b> can also detect text in images, but its strength is objects and faces, so when the question says "forms, tables, scanned documents", pick Textract. <b>Comprehend</b> understands text but <b>does not translate</b>; translating is Translate. And if the question says "build, train, deploy your own models", it is <b>SageMaker AI</b>, not a ready-made service. If the question stresses "no ML expertise" or "without building its own models", pick a ready-made AI service or Amazon Q. (You may see the name <b>Amazon Bedrock</b> among the options, even though the CLF-C02 Exam Guide does not list this service: it lets developers call foundation models through an API to <b>build their own</b> generative AI applications, unlike Amazon Q, which is a ready-to-use assistant.)</p></div>
<div class="box exam"><b>🎯 What the exam asks</b><ul>
<li>"build, train, and deploy ML models at scale" → <b>SageMaker AI</b></li>
<li>"identify objects, people, text, activities in images and videos" → <b>Rekognition</b></li>
<li>"extract text, handwriting, tables, forms from scanned documents" → <b>Textract</b></li>
<li>"sentiment of customer reviews", "extract entities, key phrases from text" → <b>Comprehend</b></li>
<li>"flag explicit or violent images/videos" → <b>Rekognition</b> (content moderation)</li>
<li>"convert call recordings to text" → <b>Transcribe</b>; "text into lifelike speech" → <b>Polly</b></li>
<li>"chatbot, conversational interface, voice and text" → <b>Lex</b></li>
<li>"generative AI assistant that answers questions from internal wikis and documents" → <b>Amazon Q Business</b>; "help developers write code" → <b>Amazon Q Developer</b></li>
</ul></div>
`,summary:["AI is the broad idea; ML lets machines learn from data to produce a model; generative AI creates new content.","SageMaker AI: build, train and deploy your own models. Ready-made AI services: just call them, no ML experts needed.","Rekognition = images/video (including moderating sensitive content); Textract = documents, tables, forms; Comprehend = sentiment, entities, key phrases in text.","Translate = translation; Transcribe = speech to text; Polly = text to speech; Lex = chatbots.","Amazon Q Business = Q&A over company data; Amazon Q Developer = coding assistant.","For multi-step problems, chain services: for example Textract → Translate → Comprehend, or Transcribe → Translate → Polly."],terms:[["Artificial Intelligence (AI)","computers doing tasks that normally need human intelligence"],["Machine Learning (ML)","machines learning patterns from many examples instead of fixed rules"],["Generative AI","AI that creates new content such as text, code or images"],["Model","the result of training, used to make predictions"],["Training","the process of teaching a model from data"],["Inference","using a trained model to make predictions"],["Data scientist","a person who analyzes data and builds ML models"],["Natural Language Processing (NLP)","getting computers to understand human language"],["Sentiment analysis","detecting whether text is positive or negative"],["Entity / key phrase","names of people, products, places / the important phrases in a text"],["Speech-to-text","turning spoken audio into written text"],["Text-to-speech","turning written text into spoken audio"],["Chatbot","a program that holds automated conversations"],["Computer vision","getting computers to understand images and video"]]};
L.course["3-13"]={title:"Data analytics: Athena, Kinesis, Glue, EMR, Redshift, Quick",goals:["Understand the data pipeline: collect → store → transform → analyze → visualize","Know which step each of Kinesis, S3, Glue, Athena, EMR, Redshift and Quick belongs to","Know that OpenSearch Service is for search and log analytics; tell Data Streams and Data Firehose apart","Pick the right service from the keywords in the question"],html:`
<h3>1. What is a data pipeline?</h3>
<p>A business produces a lot of data: orders, clicks on the website, customer reviews. Raw data says nothing by itself. To turn it into an answer such as "which cake sells best in Tokyo in summer", the data has to pass through a series of steps called a <b>data pipeline</b>.</p>
<div class="flow"><span>Collect (Kinesis)</span><span>Store (S3)</span><span>Transform (Glue / EMR)</span><span>Analyze (Athena / Redshift)</span><span>Visualize (AWS Quick)</span></div>
<div class="box idea"><b>🧠 In plain terms</b><p>It is like making orange juice: <b>pick the oranges</b> from the orchard (collect), <b>stack them in the storeroom</b> (store), <b>wash, peel and squeeze</b> (transform), <b>taste and measure the sweetness</b> (analyze), then <b>pour it into a nice glass</b> for the customer (visualize).</p></div>
<p>A concept you will meet often: a <b>data lake</b> is a place that holds every kind of raw data in its original form, at low cost. On AWS, a data lake is usually built on <b>Amazon S3</b>.</p>
<p>Why split it into several steps? Because each step needs a different kind of tool. A tool that is good at "catching" continuously flowing data is not necessarily good at long-term storage; a tool that runs heavy analysis is not necessarily easy for business people to use. AWS has a separate service for each step, and the exam usually describes a need and asks which service fits. Tip: before reading the options, ask yourself "which step of the pipeline does this need belong to?".</p>

<h3>2. Collect and transform: Kinesis, Glue, EMR</h3>
<h4>Amazon Kinesis</h4>
<p>Some data arrives in batches (for example an end-of-day report file), and some flows <b>continuously, second by second</b>, such as mouse clicks on a website (<b>clickstream</b>), IoT sensor data and application logs. The second kind is called <b>streaming data</b>. <b>Amazon Kinesis</b> collects, processes and analyzes streaming data <b>in real time</b>. Two members often appear on the exam:</p>
<table>
<tr><th></th><th>Kinesis Data Streams</th><th>Amazon Data Firehose</th></tr>
<tr><td>What it does</td><td>Catches and holds the data stream so <b>your application</b> can read and process it</td><td><b>Delivers</b> the data stream to a destination by itself: S3, Redshift, OpenSearch...</td></tr>
<tr><td>What you must do</td><td>Write your own application that reads the data (a <b>consumer</b>)</td><td>Almost nothing: just choose the source and destination, <b>no consumer to write</b>, scales automatically</td></tr>
<tr><td>Use when</td><td>You need custom real-time processing</td><td>You only need to <b>load</b> streaming data into a store in near real time</td></tr>
</table>
<p>Amazon Data Firehose used to be called Kinesis Data Firehose; the exam may use either name.</p>
<h4>AWS Glue</h4>
<p><b>ETL</b> stands for Extract - Transform - Load: <b>extract</b> data from the source, <b>transform</b> it (clean, convert formats, combine), then <b>load</b> it to where it is needed. <b>AWS Glue</b> is a <b>serverless</b> ETL service. Glue also has the <b>Data Catalog</b>: an "index" that records which data lives where and what columns it has, so that other services such as Athena can find it. Glue has <b>crawlers</b> that scan data automatically to build the index. You can <b>schedule a Glue ETL job</b> to run every night, for example converting CSV files in S3 to Parquet format (compact and faster to query), <b>without setting up or managing any cluster</b>.</p>
<h4>Amazon EMR</h4>
<p><b>Amazon EMR</b> runs well-known open-source <b>big data</b> processing frameworks such as <b>Apache Spark</b>, <b>Apache Hadoop</b>, Hive and Presto. It fits when the company already knows these tools and needs to process enormous amounts of data. AWS takes care of setting up the group of machines (the <b>cluster</b>), but you still choose the configuration and operate the cluster more than with Glue (EMR also has a Serverless option). So when the question asks for "simple ETL, <b>least operational overhead</b>, no cluster to manage", prefer <b>Glue</b>.</p>

<h3>3. Analyze and visualize: Athena, Redshift, Quick, OpenSearch</h3>
<h4>Amazon Athena</h4>
<p><b>Athena</b> lets you run <b>standard SQL directly on data in S3</b>, with no loading into a database and no servers. You pay for the amount of data each query scans. It is great for quick, occasional questions on log files or CSV files in a data lake.</p>
<h4>Amazon Redshift</h4>
<p><b>Redshift</b> is a <b>data warehouse</b> (you met it in the database lesson): data is loaded and organized in advance to run complex, frequent analytical queries on very large amounts of data, for business reporting.</p>
<h4>Amazon Quick</h4>
<p><b>Amazon Quick</b> (the name used in the Exam Guide's service list; renamed <b>AWS Quick</b> on November 9, 2026; formerly Amazon QuickSight, and older practice exams often use that name) is a <b>BI</b> (Business Intelligence) tool that helps non-technical users create <b>dashboards</b> (screens of charts and key numbers) and interactive charts from data.</p>
<h4>Amazon OpenSearch Service</h4>
<p><b>OpenSearch Service</b> is used for <b>full-text search</b> (for example the product search box on a website) and <b>near real-time log analytics</b>, with interactive dashboards (OpenSearch Dashboards) to spot spikes in errors. This service used to be called Amazon Elasticsearch Service.</p>
<h4>A few other analytics services (outside the Exam Guide's list; just know the names so you don't get confused)</h4>
<ul>
<li><b>AWS Lake Formation</b>: quickly set up and <b>manage access permissions</b> for a data lake on S3.</li>
<li><b>Amazon MSK</b> (Managed Streaming for Apache Kafka): runs <b>Apache Kafka</b> as a managed service. The word "Kafka" in the question → MSK.</li>
<li><b>AWS Data Exchange</b>: find and subscribe to <b>third-party data</b> (for example weather or financial data) to use on AWS.</li>
</ul>
<div class="box trap"><b>⚠️ Common trap</b><p><b>Athena</b> and <b>Redshift</b> both run SQL for analysis. The difference: Athena <b>queries in place on S3, is serverless, and needs no data loading</b>, which suits occasional queries; Redshift is a <b>data warehouse</b> for large, frequent analysis. <b>Glue</b> (serverless ETL, Data Catalog) and <b>EMR</b> (Spark/Hadoop) both transform data; if you see Spark/Hadoop, pick EMR. Kinesis is <b>real-time streaming</b>; don't confuse it with SQS (a message queue between application components).</p></div>

<div class="box example"><b>🍰 Example: BanhNgon Bakery</b><p>Lan wants to know "which cakes customers look at a lot but don't buy". Minh builds a pipeline: clicks on the website and app are collected in real time by <b>Kinesis</b> and poured into <b>S3</b> as the data lake. <b>Glue</b> cleans the data and builds the Data Catalog. When he needs a quick answer to a one-off question, Minh uses <b>Athena</b> to run SQL straight on S3. The weekly sales report for the 3 branches runs on <b>Redshift</b>. The results appear as a dashboard in <b>Quick</b> so Lan can view it on her phone. The "sugar-free cake" search box on the website runs on <b>OpenSearch Service</b>. Later on, the analytics team is used to Spark, so some heavy jobs run on <b>EMR</b>.</p></div>

<h3>4. Summary table</h3>
<table>
<tr><th>Step</th><th>Service</th><th>Keywords on the exam</th></tr>
<tr><td>Collect</td><td>Amazon Kinesis (Data Streams)</td><td>real-time streaming, clickstream, IoT telemetry</td></tr>
<tr><td>Collect → load</td><td>Amazon Data Firehose</td><td>deliver streaming data to S3/Redshift, no code</td></tr>
<tr><td>Store</td><td>Amazon S3</td><td>data lake, cheap storage, unlimited</td></tr>
<tr><td>Transform</td><td>AWS Glue</td><td>serverless ETL, data catalog, crawler</td></tr>
<tr><td>Transform</td><td>Amazon EMR</td><td>Apache Spark, Hadoop, big data frameworks</td></tr>
<tr><td>Analyze</td><td>Amazon Athena</td><td>SQL queries directly on S3, serverless</td></tr>
<tr><td>Analyze</td><td>Amazon Redshift</td><td>data warehouse, petabyte, complex analytics</td></tr>
<tr><td>Visualize</td><td>AWS Quick (formerly Amazon Quick; the Exam Guide and exam questions may still say Amazon Quick)</td><td>dashboards, visualizations, BI</td></tr>
<tr><td>Search, logs</td><td>Amazon OpenSearch Service</td><td>full-text search, log analytics</td></tr>
</table>
<div class="box exam"><b>🎯 What the exam asks</b><ul>
<li>"run SQL queries directly on data in S3 without loading or managing servers" → <b>Athena</b></li>
<li>"collect and process real-time streaming data, clickstreams" → <b>Kinesis</b></li>
<li>"load streaming data into S3/Redshift, no consumer applications to manage" → <b>Amazon Data Firehose</b></li>
<li>"full-text search, log analytics, near real time dashboards" → <b>OpenSearch Service</b></li>
<li>"serverless data integration, ETL, data catalog", "scheduled transform, no clusters, least operational overhead" → <b>Glue</b></li>
<li>"Apache Spark, Apache Hadoop" → <b>EMR</b></li>
<li>"complex analytical queries on petabytes" → <b>Redshift</b></li>
<li>"business users create interactive dashboards" → <b>AWS Quick</b> (Amazon Quick)</li>
</ul></div>
`,summary:["Data pipeline: collect → store → transform → analyze → visualize.","Kinesis Data Streams collects streaming data (you write the consumer); Data Firehose loads streaming data into S3/Redshift by itself; S3 usually serves as the data lake.","Glue = serverless ETL + Data Catalog, least operational effort; EMR = runs Spark/Hadoop on a cluster for big data.","Athena = SQL directly on S3, serverless; Redshift = data warehouse for large-scale analysis.","Quick (formerly QuickSight) = BI dashboards; OpenSearch Service = search and log analytics."],terms:[["Data pipeline","the series of steps data passes through, from collection to insight"],["Data lake","a low-cost store for all kinds of raw data in its original form"],["Streaming data","data that flows in continuously"],["Real-time","processed as it happens, with almost no delay"],["Clickstream","the trail of clicks a user makes"],["ETL (Extract, Transform, Load)","pull data from a source, reshape it, load it where it is needed"],["Data catalog","an index of what data exists, where it is and its structure"],["Big data","data sets too large for ordinary tools"],["Data warehouse","a database organized for large analytical queries"],["Business Intelligence (BI)","turning business data into reports and insights"],["Dashboard","a screen of charts and key numbers"],["Log analytics","analyzing log records to find problems and trends"],["Consumer application","an application that reads and processes a data stream"]]};
L.course["3-14"]={title:"Management and governance: Organizations, Control Tower, Systems Manager, Trusted Advisor…",goals:["Understand why businesses use multiple AWS accounts and how to manage them with Organizations, SCPs and Control Tower","Know what Service Catalog, Service Quotas, Systems Manager and CloudFormation are for","Tell the recommendation tools apart: Trusted Advisor, Compute Optimizer, Well-Architected Tool","Know AWS Health Dashboard, License Manager and AWS RAM"],html:`
<h3>1. Multiple AWS accounts: Organizations, SCPs and Control Tower</h3>
<p>An <b>AWS account</b> is a "private area" that holds resources and a bill. Large businesses usually use <b>multiple accounts</b>: one for the test environment, one for the live environment (production), one for each department. Splitting things this way keeps a mistake in one place from spreading to another and makes costs easier to track. But many accounts need a central way to manage them.</p>
<h4>AWS Organizations</h4>
<p><b>AWS Organizations</b> gathers many accounts into one organization and arranges them into groups called <b>OUs</b> (Organizational Units). The main benefits:</p>
<ul>
<li><b>Consolidated billing</b>, at no extra charge: <b>a single bill</b> paid by the <b>management account</b>; usage from all accounts is <b>added together</b> to reach cheaper price tiers (volume pricing tiers); and <b>Reserved Instances / Savings Plans</b> discounts can be <b>shared</b> across accounts.</li>
<li><b>SCP</b> (Service Control Policy): sets the <b>maximum limit</b> on what accounts are allowed to do. For example, "nobody in the Test OU may use Regions outside Asia".</li>
</ul>
<div class="box trap"><b>⚠️ Common trap</b><p>An SCP <b>does not grant permissions</b> to anyone. It only draws a "fence" of limits. Users still need permissions from IAM; the effective permissions are the <b>overlap</b> between what IAM allows and what the SCP does not block. An SCP applies to the whole account, including admins and the root user of a <b>member account</b>, but it does <b>not</b> restrict the management account.</p></div>
<h4>AWS Control Tower</h4>
<p><b>AWS Control Tower</b> helps you <b>quickly set up and govern</b> a secure multi-account environment that follows best practices, called a <b>landing zone</b>. It uses Organizations underneath, creates the foundational accounts for you (such as a log archive account and an audit account) and applies built-in <b>controls</b> (also called guardrails, meaning protective rules).</p>
<div class="box idea"><b>🧠 In plain terms</b><p>Organizations is like <b>a corporate group managing many shops</b>: one shared set of accounting books, plus <b>group-wide rules</b> (SCPs) that every shop must follow. Control Tower is like an <b>all-in-one "open a chain of shops" package</b>: you arrive and the standard premises, cameras and safety rules are already there, and you simply open new shops from the same mold.</p></div>

<h3>2. Provisioning and operating resources</h3>
<ul>
<li><b>AWS Service Catalog</b>: the IT department creates a <b>catalog of approved products</b> (for example "the company's standard web server") that employees can deploy themselves, with the right configuration and in line with the rules. Like a canteen's <b>fixed menu</b>: you can only choose dishes that are on the menu.</li>
<li><b>Service Quotas</b>: every AWS service has <b>limits</b> (quotas, also called service limits), for example the maximum number of resources in a Region. Service Quotas lets you see all limits in <b>one place</b>, request increases, and set CloudWatch alarms for when you are close to a limit.</li>
<li><b>AWS Systems Manager</b>: a "toolbox" for <b>managing and operating servers in bulk</b> (EC2 and on-premises machines too): automatic patching (Patch Manager), running commands on many machines at once (Run Command), signing in to machines securely without opening the SSH port (Session Manager), and storing application configuration and passwords (Parameter Store).</li>
<li><b>AWS CloudFormation</b> (a reminder): describe your infrastructure in a <b>template file</b> and let AWS create exactly that, repeatable as many times as you like. This is <b>Infrastructure as Code</b> (infrastructure defined in code).</li>
</ul>

<h3>3. Recommendation and monitoring tools</h3>
<ul>
<li><b>AWS Trusted Advisor</b>: checks your account and gives <b>best-practice recommendations</b> in 6 categories: <b>cost optimization</b>, <b>performance</b>, <b>security</b>, <b>fault tolerance</b> (surviving failures), <b>service limits</b>, and <b>operational excellence</b>. For example: it points out idle or barely used EC2 instances, unattached EBS volumes, publicly open S3 buckets, security groups that open ports to every address, a root user without MFA, and service limits you are about to reach. The <b>Basic</b> plan (free) includes <b>all service limits checks</b>, the <b>core security checks</b> (for example MFA on root, security groups with open ports, S3 bucket permissions, public EBS/RDS snapshots) and <b>one fault tolerance check</b>; the full set of checks requires the Business Support+ plan or higher.</li>
<li><b>AWS Compute Optimizer</b>: uses <b>machine learning</b> to analyze actual usage and suggest the right <b>type and size</b> of resources (EC2, Auto Scaling groups, EBS, Lambda...), in other words it supports <b>rightsizing</b>.</li>
<li><b>AWS Health Dashboard</b>: shows <b>AWS service incidents</b> and <b>scheduled maintenance</b> that may affect your resources. It has two parts: <b>Service health</b> (the general status of all AWS services, visible to everyone) and <b>Your account health</b> (events that specifically affect your resources, for example "this EC2 instance will undergo maintenance on day X"). To get this data programmatically, use the <b>AWS Health API</b>, or receive the events through EventBridge to automate alerts.</li>
<li><b>AWS Well-Architected Tool</b>: a question-and-answer tool that helps you <b>review your own workloads</b> against the pillars of the <b>AWS Well-Architected Framework</b> and points out risks to improve.</li>
</ul>
<div class="box trap"><b>⚠️ Common trap</b><p>Trusted Advisor, Compute Optimizer and Well-Architected Tool all "give advice". The difference: <b>Trusted Advisor</b> scans your account automatically and advises <b>broadly</b> across many areas (cost, security, limits...). <b>Compute Optimizer</b> focuses only on <b>picking the right resource size</b> using ML. <b>Well-Architected Tool</b> is where <b>you answer a set of questions yourself</b> to review the architecture of a workload. And <b>Health Dashboard</b> is about incidents on the <b>AWS</b> side, not optimization advice.</p></div>

<h3>4. License Manager and AWS RAM</h3>
<p><b>AWS License Manager</b> helps you <b>manage and track software licenses</b> (permits to use software) from vendors such as Microsoft, Oracle and SAP, so you don't use more licenses than you bought and avoid trouble in a licensing audit.</p>
<p><b>AWS Resource Access Manager</b> (AWS RAM) lets you <b>share resources</b> between AWS accounts (or across the whole Organization), for example sharing a subnet or a Transit Gateway, instead of each account creating its own copy.</p>

<div class="box example"><b>🍰 Example: BanhNgon Bakery</b><p>BanhNgon now has separate accounts for Hanoi, Ho Chi Minh City, Japan, testing and production. Minh uses <b>Control Tower</b> to set up the landing zone, with <b>Organizations</b> underneath combining everything into one bill. An <b>SCP</b> blocks the test account from using expensive instance types. A new employee who wants a test server picks one from <b>Service Catalog</b>. For the Mid-Autumn season, Minh goes to <b>Service Quotas</b> to request a higher limit on EC2 instances. <b>Systems Manager</b> patches all the servers automatically every week. <b>Trusted Advisor</b> reports a few unattached EBS volumes, which can be deleted to save money; <b>Compute Optimizer</b> suggests downsizing the web servers. One day the website is slow, and Minh opens <b>AWS Health Dashboard</b> to find AWS reporting an incident in one AZ. The accounting department uses <b>License Manager</b> to track Windows Server licenses. The common network is shared with all the accounts through <b>AWS RAM</b>.</p></div>

<h3>5. "What you need → what to use" table</h3>
<table>
<tr><th>Need</th><th>Service</th></tr>
<tr><td>Central management of many accounts, one shared bill</td><td>AWS Organizations (consolidated billing)</td></tr>
<tr><td>Maximum limit on permissions for an account/OU</td><td>Service Control Policy (SCP)</td></tr>
<tr><td>Quickly set up a best-practice multi-account landing zone</td><td>AWS Control Tower</td></tr>
<tr><td>Catalog of approved IT products for users to deploy themselves</td><td>AWS Service Catalog</td></tr>
<tr><td>View service limits and request increases</td><td>Service Quotas</td></tr>
<tr><td>Patch, run commands, manage servers in bulk</td><td>AWS Systems Manager</td></tr>
<tr><td>Create repeatable infrastructure from templates</td><td>AWS CloudFormation</td></tr>
<tr><td>Best-practice recommendations: cost, security, performance, limits</td><td>AWS Trusted Advisor</td></tr>
<tr><td>ML-based suggestions for the optimal EC2 type/size</td><td>AWS Compute Optimizer</td></tr>
<tr><td>AWS incidents and scheduled maintenance affecting the account</td><td>AWS Health Dashboard</td></tr>
<tr><td>Review a workload against the Well-Architected Framework</td><td>AWS Well-Architected Tool</td></tr>
<tr><td>Track Microsoft, Oracle software licenses</td><td>AWS License Manager</td></tr>
<tr><td>Share resources between accounts</td><td>AWS Resource Access Manager (RAM)</td></tr>
</table>
<div class="box exam"><b>🎯 What the exam asks</b><ul>
<li>"single bill, volume discounts across accounts" → <b>Organizations consolidated billing</b></li>
<li>"set up and govern a secure multi-account environment (landing zone)" → <b>Control Tower</b></li>
<li>"catalogs of approved IT services" → <b>Service Catalog</b>; "view limits and request increases" → <b>Service Quotas</b></li>
<li>"recommend optimal EC2 instance types using ML" → <b>Compute Optimizer</b></li>
<li>"identify idle resources, best practice checks", "security groups with unrestricted ports, root without MFA" → <b>Trusted Advisor</b></li>
<li>"prevent member accounts, even administrators, from using Regions outside X" → <b>SCP</b></li>
<li>"share RI/Savings Plans discounts across accounts" → <b>consolidated billing</b></li>
<li>"patch and run commands on EC2 and on-premises servers" → <b>Systems Manager</b>; "share subnets with other accounts" → <b>AWS RAM</b></li>
<li>"AWS service events, scheduled maintenance affecting your resources" → <b>AWS Health Dashboard</b></li>
<li>"review workloads against Well-Architected best practices" → <b>Well-Architected Tool</b></li>
<li>"manage software licenses (Microsoft, Oracle)" → <b>License Manager</b></li>
</ul></div>
`,summary:["Organizations groups many accounts: consolidated billing (one bill, combined usage for price tiers, shared RI/Savings Plans discounts) and SCPs (a maximum limit, they do not grant permissions).","Control Tower sets up a best-practice multi-account landing zone, using Organizations underneath.","Service Catalog = catalog of approved products; Service Quotas = view limits and request increases.","Systems Manager = operate servers in bulk (patching, running commands, Session Manager); CloudFormation = infrastructure from templates.","Trusted Advisor = best-practice recommendations in 6 categories (Basic has all service limits checks + core security checks + 1 fault tolerance check); Compute Optimizer = rightsizing with ML; Well-Architected Tool = review your own workloads.","Health Dashboard = AWS incidents and maintenance; License Manager = manage licenses; RAM = share resources between accounts."],terms:[["AWS account","a private container for AWS resources with its own bill"],["Organizational Unit (OU)","a group of accounts inside an organization"],["Consolidated billing","one combined bill for all accounts in an organization"],["Service Control Policy (SCP)","a policy that caps what accounts are allowed to do"],["Landing zone","a ready-made, standards-based multi-account environment"],["Guardrail / control","a protective rule applied to accounts"],["Service quota / service limit","the maximum amount of a resource you can use"],["Patch","a software update that fixes bugs or security holes"],["Infrastructure as Code (IaC)","defining infrastructure in code or template files"],["Best practice","the recommended, proven way of doing something"],["Rightsizing","choosing the resource size that matches actual need"],["Scheduled maintenance","maintenance planned in advance"],["Software license","a permit to use a piece of software"],["Resource sharing","letting several accounts use the same resource"]]};
})();
