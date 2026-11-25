(function(){var I=window.CLF_I18N=window.CLF_I18N||{};var L=I.en=I.en||{};['q','course','lessons','glossary','services','domains','ui'].forEach(function(k){L[k]=L[k]||{};});
L.course["2-1"]={title:"The Shared Responsibility Model",goals:["Tell apart \"security OF the cloud\" (AWS's job) and \"security IN the cloud\" (your job)","Know how responsibility shifts when you use EC2, RDS, Lambda, and S3","Understand the three groups of shared controls: patch management, configuration management, awareness & training","Quickly answer \"is this AWS's job or the customer's job?\" questions"],html:`
<h3>Why does security responsibility have to be "shared"?</h3>
<p>When you buy your own computer and keep it at home to run a website, <b>everything</b> is your job: locking the server room door, replacing failed hard drives, installing antivirus software, setting passwords, backing up data. Nobody does it for you.</p>
<p>When you move to the cloud, you are <b>renting</b> AWS's infrastructure. Part of the security work is now done by AWS, and the rest is still yours. AWS calls the boundary between these two parts the <b>Shared Responsibility Model</b>.</p>
<p>This is one of the topics that is <b>guaranteed to be on the exam</b>. The questions are usually very short: "Is task X the responsibility of AWS or the customer?". Master this lesson and you have a few questions in the bag.</p>

<div class="box idea"><b>🧠 In plain terms</b><p>Imagine you rent an apartment in a building. The <b>building owner</b> takes care of the foundation, the outer walls, the elevators, the guards at the gate, and the shared power and water systems. <b>You</b> (the tenant) take care of locking your own apartment door, deciding who gets a key, putting valuables in a safe, and not letting the gas stove catch fire. If you forget to lock the door and something is stolen, that is not the building owner's fault.</p><p>AWS is the building owner. You are the tenant.</p></div>

<h3>Security OF the cloud and security IN the cloud</h3>
<p>AWS sums up the model with two easy-to-remember phrases:</p>
<ul>
<li><b>Security OF the cloud</b> (securing the cloud <i>itself</i>) is the job of <b>AWS</b>. It means protecting the infrastructure that makes up the cloud: the data center buildings, physical servers, hard drives, network cables, power and cooling systems, the virtualization software (the <b>hypervisor</b>, the software layer that splits one real server into many virtual machines), and the global network connecting Regions, Availability Zones, and edge locations.</li>
<li><b>Security IN the cloud</b> (securing what is <i>inside</i> the cloud) is the job of the <b>customer</b>. It means protecting what you put into and configure on the cloud: your data, who can sign in and what they can do (IAM), firewall configuration (security groups), whether data is encrypted or not, the operating system on EC2 virtual machines, and the applications you install.</li>
</ul>
<table>
<tr><th>AWS handles (OF the cloud)</th><th>Customer handles (IN the cloud)</th></tr>
<tr><td>Physical security of data centers: guards, cameras, access control</td><td>Customer data, and classifying and encrypting that data</td></tr>
<tr><td>Hardware: servers, hard drives, network devices; replacing and destroying old drives</td><td>Managing users, access permissions, passwords, MFA (IAM)</td></tr>
<tr><td>The hypervisor and virtualization infrastructure</td><td>The guest OS on EC2: installing patches, configuration</td></tr>
<tr><td>The global network, Regions, AZs, edge locations</td><td>Configuring security groups, network ACLs, firewalls inside the instance</td></tr>
<tr><td>The underlying software of managed services (RDS, Lambda, S3…)</td><td>Your own applications and source code, turning on encryption, configuring S3 access permissions</td></tr>
</table>

<div class="box example"><b>🍰 Example: BanhNgon Bakery</b><p>Back when the BanhNgon website still ran on a computer in the storeroom, a mouse once chewed through the power cable and the website was down all morning. Minh had to go buy a new cable himself. Since moving to AWS, power, cables, and failed hard drives are AWS's job.</p><p>But Minh still has to take care of some things himself: setting a strong password for the account, not sharing the password with the sales staff, installing patches for the operating system on the EC2 server, and not leaving the folder of invoice images on S3 public. If Minh accidentally makes the invoice folder public, AWS is <b>not</b> responsible.</p></div>

<h3>Responsibility changes with the type of service</h3>
<p>The boundary is not fixed. The more <b>managed</b> a service is (meaning AWS runs more of it for you), the more AWS handles and the less you handle. Compare four services that often appear on the exam:</p>
<ul>
<li><b>Amazon EC2</b> (virtual servers): you rent an "empty computer". AWS handles the hardware and the hypervisor. You handle the operating system, patches, any software you install, the firewall, and the data. This is <b>IaaS</b> (Infrastructure as a Service), so you carry the most work.</li>
<li><b>Amazon RDS</b> (managed relational databases): AWS also handles the underlying operating system, installing and patching the database software, and supports automated backups. You handle: creating <b>database accounts</b> and giving each account only the permissions it needs, database passwords, whether encryption is turned on, security groups (which sources may connect to the database), and the data inside.</li>
<li><b>AWS Lambda</b> (runs code without managing servers, <b>serverless</b>): AWS handles the servers, the operating system, the runtime environment, and scaling. You only handle the function's <b>source code</b>, the function's IAM permissions, and the data it processes.</li>
<li><b>Amazon S3</b> (file storage): AWS handles the storage infrastructure and data durability. You handle: who can read/write the bucket (bucket policy, blocking public access), whether encryption is used, whether versioning is turned on, and the file contents.</li>
</ul>
<table>
<tr><th>Task</th><th>EC2</th><th>RDS</th><th>Lambda</th><th>S3</th></tr>
<tr><td>Hardware, data centers</td><td>AWS</td><td>AWS</td><td>AWS</td><td>AWS</td></tr>
<tr><td>Patching the operating system</td><td><b>Customer</b></td><td>AWS</td><td>AWS</td><td>AWS</td></tr>
<tr><td>Patching database software / runtime</td><td><b>Customer</b> (if self-installed)</td><td>AWS</td><td>AWS</td><td>Not applicable</td></tr>
<tr><td>Configuring the network firewall (security group)</td><td><b>Customer</b></td><td><b>Customer</b></td><td>Not required</td><td>Not applicable</td></tr>
<tr><td>Application source code</td><td><b>Customer</b></td><td><b>Customer</b></td><td><b>Customer</b></td><td>Not applicable</td></tr>
<tr><td>Access permissions (IAM, policies)</td><td><b>Customer</b></td><td><b>Customer</b></td><td><b>Customer</b></td><td><b>Customer</b></td></tr>
<tr><td>Data and turning on encryption</td><td><b>Customer</b></td><td><b>Customer</b></td><td><b>Customer</b></td><td><b>Customer</b></td></tr>
</table>
<p>Notice the last two rows: <b>data</b> (classifying data, choosing how to protect it) and <b>access permissions</b> (which identities can read/write which resources) are always the customer's job, no matter which service you use, even a "very managed" service like <b>Amazon DynamoDB</b>. AWS never decides on its own who gets to see your data.</p>
<h4>A few cases the exam likes to present</h4>
<ul>
<li><b>Containers: ECS on EC2 → AWS Fargate</b>. With ECS on EC2, you must patch and harden the servers that run the containers. Move to <b>Fargate</b> (serverless containers) and AWS handles the underlying servers and operating system; you still handle the container image, the code, and IAM permissions.</li>
<li><b>Backups</b>: AWS replicates an EBS volume within one AZ to protect against hardware failure, but that does <b>not</b> save you when you delete something by mistake or the application corrupts the data. Creating <b>snapshots</b>/backups for recovery is the <b>customer's</b> job.</li>
<li><b>AWS Outposts</b> (a rack of AWS hardware placed at your own site): AWS still handles the rack's hardware and software, but <b>physical security and access control at the place where the rack sits</b> shift to the <b>customer</b>, because it is in your building, not in an AWS data center.</li>
</ul>

<div class="box trap"><b>⚠️ Common trap</b><p><b>"Patching"</b> is the easiest place to slip up. Patching the operating system on <b>EC2</b> is the <b>customer's</b> job. Patching the operating system and database engine of <b>RDS</b> is <b>AWS's</b> job (you only choose the maintenance window). The exam likes to swap the service name to test you.</p><p>Another trap: "encrypting data". AWS <b>provides the tools</b> for encryption, but <b>turning on and managing</b> encryption of your data is still the customer's responsibility.</p></div>

<h3>Shared controls: tasks both sides do</h3>
<p>There are some kinds of work that <b>both AWS and the customer</b> must do, each within its own scope. AWS calls these <b>shared controls</b>. The exam often mentions three kinds:</p>
<ul>
<li><b>Patch management</b>: AWS patches AWS's infrastructure. The customer patches their own guest operating system and applications.</li>
<li><b>Configuration management</b>: AWS correctly configures its infrastructure devices. The customer correctly configures their own operating systems, databases, and applications.</li>
<li><b>Awareness &amp; training</b>: AWS trains AWS employees. The customer trains their own employees (for example: do not click strange links, do not share passwords).</li>
</ul>
<p>To avoid mixing them up, remember the three groups of controls from the AWS documentation:</p>
<table>
<tr><th>Type of control</th><th>Meaning</th><th>Example</th></tr>
<tr><td><b>Inherited controls</b></td><td>The customer inherits these <b>fully</b> from AWS and does not have to do anything. During an audit, you use AWS's audit reports (downloaded from AWS Artifact) as evidence.</td><td><b>Physical and environmental controls</b>: physical security, power, cooling, and fire protection of the data center</td></tr>
<tr><td><b>Shared controls</b></td><td>Both sides do the work, each within its own scope</td><td>Patch management, configuration management, awareness &amp; training</td></tr>
<tr><td><b>Customer-specific controls</b></td><td>Only the customer is responsible, depending on their application</td><td>Protecting the application's data and communication flows, zoning data within their own environment</td></tr>
</table>

<div class="box idea"><b>🧠 In plain terms</b><p>In an apartment building, "maintenance" is shared work: the building owner maintains the elevators, you maintain the air conditioner in your apartment. "Fire safety training" is shared too: the management trains the guards, you remind your family to turn off the stove. Same kind of work, each side does its own part.</p></div>

<h3>How to answer exam questions</h3>
<p>A simple trick: ask whether the thing can be <b>physically touched</b>. If it is something physical (buildings, hard drives, cables) or the virtualization layer underneath, it belongs to AWS. If it is something you <b>configure, write, or decide</b> (passwords, permissions, data, code, security groups), it belongs to you. For the operating system, check whether the service is EC2 (you) or managed (AWS).</p>

<div class="box exam"><b>🎯 What the exam asks</b><ul>
<li>"Physical security of data centers", "hardware", "global infrastructure", "hypervisor" → <b>AWS</b></li>
<li>"Patching the guest operating system on EC2" → <b>Customer</b></li>
<li>"Patching the database engine on Amazon RDS" → <b>AWS</b></li>
<li>"Configuring security groups", "IAM users and permissions", "customer data", "encrypting data" → <b>Customer</b></li>
<li>"With AWS Lambda, the customer is responsible for…" → <b>function code and IAM permissions</b></li>
<li>"Which is a shared control?" → <b>Patch management, configuration management, awareness and training</b></li>
<li>"Controls fully inherited from AWS" → <b>Physical and environmental controls</b></li>
<li>"Move from ECS on EC2 to Fargate, which task goes away?" → <b>patching the host OS</b>; "EBS is replicated, do we need backups?" → <b>Yes, the customer creates their own snapshots/backups</b></li>
<li>"AWS Outposts in our own facility" → the customer also handles <b>physical security of the site</b></li>
</ul></div>
`,summary:["AWS is responsible for \"security OF the cloud\": data centers, hardware, the hypervisor, the global network.","The customer is responsible for \"security IN the cloud\": data, IAM, configuration, encryption, applications.","The more managed a service is (RDS, Lambda), the more AWS handles; with EC2 the customer handles the most.","Patching the OS on EC2 is the customer's job; patching the OS and database engine of RDS is AWS's job.","Data and access permissions are always the customer's responsibility with every service.","Shared controls: patch management, configuration management, awareness & training; each side works within its own scope.","Inherited controls (fully inherited from AWS): the physical and environmental controls of the data center.","Backups (EBS snapshots) are the customer's job; with Outposts, physical security of the site where the rack sits is the customer's job."],terms:[["Shared Responsibility Model","the split of security duties between AWS and the customer"],["Security OF the cloud","protecting the cloud infrastructure itself (AWS's part)"],["Security IN the cloud","protecting what you put and configure in the cloud (the customer's part)"],["Data center","a building that houses servers and network equipment"],["Hypervisor","virtualization software that splits a real server into virtual machines"],["Guest operating system","the operating system running on a virtual machine"],["Patch","a software update that fixes bugs or security holes"],["Managed service","a service that AWS operates and maintains for you"],["Shared controls","controls that both AWS and the customer apply, each in its own scope"],["Inherited controls","controls the customer fully inherits from AWS"],["Physical and environmental controls","physical security, power, cooling and fire protection (inherited from AWS)"],["AWS Outposts","a rack of AWS infrastructure placed at the customer's site"],["Configuration management","keeping systems set up correctly and consistently"],["Awareness and training","teaching staff to work securely"]]};
L.course["2-2"]={title:"IAM: users, groups, roles, policies, and least privilege",goals:["Tell apart authentication and authorization","Understand what users, groups, roles, and policies are and when to use each","Apply least privilege; understand explicit deny, the types of policies, permissions boundaries, and SCPs","Know why you should use roles for EC2 and for cross-account access"],html:`
<h3>The two questions of every security system</h3>
<p>Whenever someone wants to do something on a system, the system must answer two questions, in order:</p>
<ol>
<li><b>Who are you?</b> This is <b>authentication</b>. For example: entering a username and password, or scanning a fingerprint.</li>
<li><b>What are you allowed to do?</b> This is <b>authorization</b>. For example: an accountant can view invoices but cannot delete servers.</li>
</ol>
<p>On AWS, both jobs are handled by <b>AWS IAM</b> (Identity and Access Management). IAM is a <b>global</b> service (not tied to any Region) and it is <b>free</b>.</p>

<div class="box idea"><b>🧠 In plain terms</b><p>Think of an office building that uses key cards. The receptionist checks your ID and hands you a card: that is <b>authentication</b>. Your card opens the door on floor 3 but not the server room: that is <b>authorization</b>. The list of "which doors this card opens" is the <b>policy</b>.</p></div>

<h3>Four core concepts: user, group, role, policy</h3>
<h4>IAM user</h4>
<p>An <b>IAM user</b> represents <b>one person</b> (or one application) that needs to use AWS long term. Each user has its own name and its own credentials: a password to sign in to the web interface (the AWS Management Console) and/or an <b>access key</b> to use the command line or code. The rule: <b>one user per person</b>, never shared.</p>
<p><i>Note: today AWS recommends that <b>human users</b> (employees) sign in through <b>federation</b> (linking identities with a system you already have) or <b>AWS IAM Identity Center</b> so they use temporary credentials, instead of creating IAM users with long-term passwords/access keys. IAM users still work for special cases. See lesson 2-3 for more. The CLF-C02 exam still asks a lot about users/groups/roles, so you still need to know the material below.</i></p>
<h4>IAM group</h4>
<p>An <b>IAM group</b> is a collection of users. You attach permissions to the group, and every user in the group automatically gets them. When a new employee joins, you just add them to the group. A group contains only users, not other groups, and a group is not something you can "sign in" as.</p>
<h4>IAM policy</h4>
<p>A <b>policy</b> is a document that states which actions are <b>allowed (Allow)</b> or <b>forbidden (Deny)</b>, and on which resources. Policies are written in <b>JSON</b> (a structured text format that machines can read). You do not need to memorize the syntax for the exam, just understand the idea, roughly:</p>
<p><code>Effect: Allow | Action: s3:GetObject | Resource: bucket cake-photos</code></p>
<p>This means: "allow reading files in the cake-photos bucket". AWS evaluates permissions in three easy-to-remember steps:</p>
<ol>
<li>By default everything is <b>denied</b> (implicit deny) until a policy allows it.</li>
<li>If there is a matching <b>Allow</b> policy, the action is allowed...</li>
<li>...unless any policy contains an <b>explicit Deny</b>. <b>An explicit deny always wins</b> over any Allow.</li>
</ol>
<p>Example: a user is in a group with AdministratorAccess (Allow everything), but also has a policy attached that denies deleting S3 buckets. When the user deletes a bucket → <b>denied</b>, because the explicit Deny wins.</p>
<p>Three common types of policies attached to identities (identity-based policies):</p>
<ul>
<li><b>AWS managed policy</b>: a policy written by AWS and <b>updated automatically</b>, for example AdministratorAccess, ReadOnlyAccess, or job-function policies such as <b>SecurityAudit</b> (view security configuration) and Billing. It takes the least effort and keeps up with new services, but it usually grants more than you need, and the permissions can change when AWS updates it without you reviewing the change.</li>
<li><b>Customer managed policy</b>: a policy you write yourself, reusable across many users/groups/roles. It only changes when <b>you</b> edit it, and IAM <b>keeps previous versions</b> so you can roll back after a bad edit. A good fit when you need precise control.</li>
<li><b>Inline policy</b>: a policy <b>embedded directly</b> in a single user/group/role. It cannot be attached to another identity and it is <b>deleted along with</b> that identity. Use it when a permission must belong to exactly one identity.</li>
</ul>
<p>There are also <b>resource-based policies</b>: policies attached to <b>the resource itself</b> instead of to a person. The classic example is an <b>S3 bucket policy</b>: you state right on the bucket that "partner X's AWS account may upload files", with no need to create a user or role for the partner.</p>
<h4>IAM role</h4>
<p>An <b>IAM role</b> is a "set of permissions" that someone or something can <b>take on temporarily</b> (assume the role). A role has no fixed password or access key. When the role is assumed, AWS issues <b>temporary credentials</b> that expire on their own after a while.</p>
<p>Roles are used for: AWS services (EC2, Lambda) that need to call other services; users in <b>another AWS account</b>; employees who sign in through the company's system (federation, covered in the next lesson).</p>

<div class="box idea"><b>🧠 In plain terms</b><p>A <b>user</b> is like an employee badge with your photo and name, used long term. A <b>group</b> is like a department: the whole Accounting department can enter the records room. A <b>policy</b> is the list of doors that may be opened. A <b>role</b> is like a <b>visitor badge</b> at the front desk: whoever needs it borrows it, returns it when done, and the badge deactivates itself when time is up.</p></div>

<table>
<tr><th>Concept</th><th>What it is</th><th>Long-term password/key?</th><th>Example use</th></tr>
<tr><td>User</td><td>One person or application</td><td>Yes</td><td>Minh signs in to the console</td></tr>
<tr><td>Group</td><td>A collection of users</td><td>No (cannot sign in)</td><td>The "Developers" group</td></tr>
<tr><td>Role</td><td>A set of permissions to assume temporarily</td><td>No, only temporary credentials</td><td>EC2 reads S3; someone in another account</td></tr>
<tr><td>Policy</td><td>A JSON document that defines permissions</td><td>Not applicable</td><td>"May only read the photo bucket"</td></tr>
</table>

<div class="box example"><b>🍰 Example: BanhNgon Bakery</b><p>BanhNgon now has 6 people who need access to AWS. Minh creates a separate user for each person, then creates two groups: <b>Developers</b> (3 contract programmers) and <b>Marketing</b> (2 people who run ads). The Developers group gets a policy that allows managing EC2 and Lambda. The Marketing group can only read sales reports in one S3 bucket.</p><p>Lan asks: "Why not just give everyone admin rights to keep it quick?". Minh explains: if a marketing person is tricked into leaking their password, the attacker can only read reports, not delete servers.</p></div>

<h3>The principle of least privilege</h3>
<p>The <b>principle of least privilege</b> means: grant <b>exactly</b> the permissions needed for the job, and no more. Grant more when more is needed, and take permissions back when they are no longer needed.</p>
<p>The benefit: if an account is compromised or someone clicks the wrong thing, the damage is limited to a small area. This is a foundational principle and it appears very often on the exam.</p>
<p>In practice: start with few permissions, assign permissions through groups instead of to individual users, prefer policies that list only the actions needed, and regularly review which permissions are unused so you can remove them (lesson 2-3 covers the IAM access advisor tool).</p>

<h3>Roles for EC2 and cross-account access</h3>
<h4>Roles for EC2</h4>
<p>Suppose an application running on an EC2 server needs to read photos from S3. The <b>wrong</b> way: create an access key for a user and save it in a file on the server. If someone gets that file, they have a key that works forever.</p>
<p>The <b>right</b> way: create an <b>IAM role</b> with permission to read S3 and attach the role to the EC2 instance (through an <b>instance profile</b>). The application receives temporary credentials automatically, and AWS rotates them regularly. No key sits on the disk.</p>
<h4>Cross-account access</h4>
<p>Many companies have several AWS accounts. If someone in account A needs to use resources in account B, do <b>not</b> create another user in B. Instead, create a role in account B and allow the person in account A to <b>assume</b> that role. They get temporary permissions that are easy to revoke.</p>
<div class="flow"><span>User in account A</span><span>Assume role</span><span>Role in account B</span><span>Resources in B</span></div>
<p>When the party being granted access is an <b>outside company</b> (for example an audit firm using its own AWS account), the recommended approach is to create a role (for example read-only) for their account to assume, together with an <b>external ID</b> (a secret code both sides agree on) so that no other third party can misuse the role. When the contract ends, delete the role.</p>

<h3>Guardrails that cap maximum permissions: permissions boundaries and SCPs</h3>
<p>Policies usually answer "what may be done". Two tools answer a different question: "what is the <b>maximum</b> that may be done". They <b>do not grant permissions</b>; they only set a ceiling.</p>
<table>
<tr><th>Tool</th><th>Applies to</th><th>Use when</th></tr>
<tr><td>IAM policy (identity/resource-based)</td><td>Users, groups, roles, resources</td><td>Granting specific permissions</td></tr>
<tr><td><b>Permissions boundary</b></td><td>One user or role in the account</td><td>Letting developers create roles themselves while those roles can <b>never</b> exceed a defined maximum set of permissions, even if they attach a broader policy</td></tr>
<tr><td><b>SCP</b> (Service Control Policy, from AWS Organizations)</td><td>A whole member account or OU</td><td>Forbidding everyone in a member account, <b>including the admins and root user</b> of that account, from doing something (for example using Regions outside Europe)</td></tr>
</table>
<p>Effective permissions = the intersection: the action must be allowed by a policy <b>and</b> fall within the boundary/SCP, and must not be denied anywhere.</p>
<p>Note: SCPs only affect <b>member accounts</b>. SCPs <b>do not restrict</b> users and roles in the <b>management account</b> (the organization's managing account), so do not run workloads in that account.</p>

<div class="box trap"><b>⚠️ Common trap</b><p>If you see "EC2 needs to access S3" and an option says "store access keys on the instance" or "embed credentials in code", eliminate it right away. The correct answer is always an <b>IAM role</b>.</p><p>Another trap: <b>groups cannot be nested in groups</b> and are <b>not a way to grant permissions to AWS services</b>. AWS services use roles, not groups.</p></div>

<div class="box exam"><b>🎯 What the exam asks</b><ul>
<li>"Grant only the permissions required to perform a task" → <b>Principle of least privilege</b></li>
<li>"Give the same permissions to many developers efficiently" → <b>IAM group</b> + attach a policy</li>
<li>"Application on EC2 needs to access S3 securely" → <b>IAM role</b> attached to the EC2 instance</li>
<li>"User in account A needs temporary access to account B" → <b>IAM role</b> in account B (cross-account)</li>
<li>"Document that defines permissions, written in JSON" → <b>IAM policy</b></li>
<li>"Is IAM regional?" → No, IAM is <b>global</b> and <b>free</b></li>
<li>"Allow from a group but explicit Deny attached" → <b>Denied</b> (explicit deny wins)</li>
<li>"Full control over when permissions change, reusable, roll back" → <b>customer managed policy</b>; "one identity only, deleted with it" → <b>inline policy</b>; "least overhead, stays current with new services" → <b>AWS managed policy</b> (for example SecurityAudit)</li>
<li>"Roles that developers create can never exceed a maximum set" → <b>permissions boundary</b></li>
<li>"Prevent all member accounts, even admins, from using some Regions/services" → <b>SCP</b></li>
<li>"Grant another account access on the bucket itself" → <b>S3 bucket policy</b> (resource-based); "external auditor's account, read-only" → <b>role + external ID</b></li>
</ul></div>
`,summary:["Authentication = proving who you are; authorization = what you are allowed to do. IAM does both, and it is a global, free service.","User = one person/application; group = a collection of users; policy = a JSON document that defines permissions; role = temporary permissions to assume.","By default everything is denied; an explicit Deny always wins over an Allow.","AWS managed policies are written and automatically updated by AWS; customer managed policies are under your control, with versions for rollback; inline policies are tied to a single identity.","Resource-based policies (for example an S3 bucket policy) are attached to the resource and can grant access to other accounts.","Permissions boundaries and SCPs only set a maximum limit and do not grant permissions; SCPs do not apply to the management account, but they do apply to the admins/root user of member accounts.","Least privilege: grant only the permissions needed, and review them regularly.","Applications on EC2 and cross-account access: use an IAM role, do not store access keys."],terms:[["IAM (Identity and Access Management)","the AWS service that manages identities and their permissions"],["Authentication","proving who you are"],["Authorization","deciding what you are allowed to do"],["IAM user","an identity for one person or application with long-term credentials"],["IAM group","a collection of IAM users that share permissions"],["IAM role","a set of permissions that is assumed temporarily"],["IAM policy","a JSON document that defines permissions"],["AWS managed policy","a policy written and maintained by AWS"],["Customer managed policy","a reusable policy you write and maintain yourself"],["Principle of least privilege","grant only the permissions needed for the task"],["Temporary credentials","sign-in credentials that expire automatically"],["Assume role","to take on a role and receive its temporary permissions"],["Cross-account access","access from one AWS account to resources in another"],["Instance profile","the container that attaches a role to an EC2 instance"],["Inline policy","a policy embedded in exactly one identity"],["Resource-based policy","a policy attached to a resource (for example a bucket policy)"],["Explicit deny","a Deny statement in a policy (always wins over Allow)"],["Permissions boundary","the maximum permissions a user or role can have"]]};
L.course["2-3"]={title:"Root user, MFA, sign-in, and secrets management",goals:["Know what the root user is, how to protect it, and which tasks only root can do","Understand MFA, password policies, access keys, and how to use them safely","Tell apart IAM Identity Center, Amazon Cognito, and AWS Directory Service","Choose correctly between Secrets Manager and Parameter Store; know the credential report and access advisor"],html:`
<h3>Root user: the master key</h3>
<p>When you create an AWS account with an email and password, that identity is the <b>root user</b>. The root user has <b>absolute full access</b> to the account: creating and deleting anything, viewing bills, even closing the account. No policy can restrict root within its own account (unless you use AWS Organizations mechanisms).</p>
<p>Because its power is that great, if root is compromised you lose almost everything. Here is how to protect it, following AWS recommendations:</p>
<ul>
<li>Set a strong password and <b>turn on MFA</b> for root. Today AWS <b>requires MFA for the root user by default</b>: when you create an account or sign in, you are asked to register an MFA device.</li>
<li><b>Do not use root for everyday work</b>. Create an identity with administrator permissions for day-to-day tasks.</li>
<li><b>Do not create access keys</b> for root (if they already exist, delete them).</li>
<li>Use a dedicated, secure email for root, and only use root for tasks that only root can do.</li>
</ul>

<div class="box idea"><b>🧠 In plain terms</b><p>The root user is like the <b>master key</b> to the whole building, plus the property deed. You do not carry it with you to the market every day. You lock it in a safe (MFA), and day to day you only use your apartment key (an IAM user/role with just enough permissions).</p></div>

<h4>Tasks only the root user can do</h4>
<p>The exam loves to ask about this list. Some typical tasks:</p>
<ul>
<li>For a standalone account: change the account's <b>email</b>, the <b>root password</b>, and root's access keys. (Other settings such as the account name, contact information, and enabled Regions do <b>not</b> need root.)</li>
<li><b>Close a standalone AWS account</b>, and reopen an account you just closed yourself.</li>
<li><b>Restore IAM permissions</b> when the only IAM administrator accidentally removes their own permissions: sign in as root and reattach the policy.</li>
<li><b>Activate access to the Billing pages for IAM users/roles</b> (the Billing and Cost Management console).</li>
<li><b>Register as a seller</b> on the Reserved Instance Marketplace.</li>
<li>Turn on <b>MFA Delete</b> for an S3 bucket (requires MFA when deleting file versions).</li>
<li><b>Edit or delete an S3 bucket policy that accidentally denies all principals</b> (locking even the admins out).</li>
</ul>
<p><b>Centralized root access</b>: if the company uses AWS Organizations, it can turn on this feature in IAM to <b>completely remove the long-term root credentials</b> (password, access keys, MFA) of member accounts. When a privileged task is needed (for example removing a bucket policy that blocks everyone), an admin in the management account performs it centrally using a short-lived root session. Newly created member accounts also have no root credentials.</p>
<p><i>Note: older study materials often say that "changing the AWS Support plan" is a root-only task. AWS's current official list no longer includes it (an IAM user with the right permissions can do it). If the exam still asks in the old style, prefer the safer answers such as closing the account or changing the root email/password.</i></p>

<h3>MFA and password policies</h3>
<p><b>MFA</b> (Multi-Factor Authentication) requires you to prove your identity with <b>two or more things</b>: something you <b>know</b> (a password) and something you <b>have</b> (a phone running a code-generating app, or a hardware security key). An attacker who knows your password but does not hold your phone still cannot get in.</p>
<p>AWS supports three types of MFA devices:</p>
<table>
<tr><th>MFA type</th><th>What it is</th><th>Notes</th></tr>
<tr><td><b>Passkey / FIDO2 security key</b></td><td>A security key you plug into USB or tap, or a passkey on a phone or computer</td><td><b>Phishing-resistant</b>: a fake site gets nothing it can reuse</td></tr>
<tr><td>Virtual MFA</td><td>A phone app that generates 6-digit codes</td><td>Common and free, but you can still be tricked into typing the code into a fake site</td></tr>
<tr><td>Hardware TOTP token</td><td>A small device that generates codes</td><td>No phone needed</td></tr>
</table>
<p>You should turn on MFA for root and for every user with important permissions. Each user (including root) can register <b>multiple MFA devices</b> (up to 8). Register a <b>second device</b> and keep it somewhere else, so you can still sign in if you lose one device.</p>
<p>A <b>password policy</b> is a set of rules that applies to the passwords of <b>IAM users</b> in the account: minimum length, required uppercase letters, numbers, and special characters, expiration period, and no reuse of old passwords. Note: the password policy <b>does not apply to the root password</b>.</p>

<h3>Access keys: keys for machines</h3>
<p>Besides signing in on the web with a password, people also control AWS from the command line (<b>AWS CLI</b>) or from code (<b>AWS SDK</b>). That requires an <b>access key</b>, which has two parts: the <b>access key ID</b> (like a username) and the <b>secret access key</b> (like a password).</p>
<p>Safety rules: do not share keys, do not put keys in code or push them to the internet, rotate keys regularly, delete unused keys. And importantly: <b>do not store access keys on EC2 servers</b>. Applications on EC2 should use an <b>IAM role</b> as in the previous lesson. Developers who run the CLI from a laptop should sign in through <b>IAM Identity Center</b> to get <b>short-term credentials</b>, instead of keeping long-term access keys on the machine.</p>
<p><b>If an access key is leaked</b> (for example pushed to a public code repository by mistake): <b>deactivate and then delete the key</b> right away, then check <b>CloudTrail</b> to see which APIs that key called, and create a new key/role only if you really need one.</p>

<div class="box example"><b>🍰 Example: BanhNgon Bakery</b><p>In the first year, Lan simply used the sign-up email (root) to sign in to AWS every day, with the password stuck on her monitor. Minh was horrified: he turned on MFA for root using an app on Lan's phone, put root away, and created a separate administrator identity for her daily work.</p><p>Minh also discovered that a former developer had left an access key in the code on the EC2 server. He deleted that key, replaced it with an IAM role, and set a password policy: at least 12 characters, changed every 90 days.</p></div>

<h3>Sign in once: federation, IAM Identity Center, Cognito, Directory Service</h3>
<p><b>Identity federation</b> means letting users sign in to AWS with an account they <b>already have somewhere else</b> (for example a company account in Microsoft Active Directory, Okta, or Google), instead of creating more IAM users. An <b>identity provider</b> (IdP) authenticates them, and AWS trusts that result and grants temporary permissions through a role.</p>
<ul>
<li><b>AWS IAM Identity Center</b> (formerly AWS SSO): for a company's <b>employees</b>. They sign in <b>once</b> (single sign-on) and can access many AWS accounts in AWS Organizations along with business applications. You can use the built-in directory in Identity Center or connect an external IdP. Permissions are defined once as a <b>permission set</b> and then assigned to a group of people across many accounts at once. This is the approach AWS recommends for internal users.</li>
<li><b>Amazon Cognito</b>: for the <b>end users of an application</b> (your customers), for example cake buyers who sign up and sign in to a mobile app, including sign-in with Google or Facebook. It can serve a very large number of users.</li>
<li><b>AWS Directory Service</b>: provides <b>Microsoft Active Directory</b> (an account management system widely used in businesses) on AWS, for example AWS Managed Microsoft AD, or connects to an existing Active Directory at the company's office.</li>
</ul>
<table>
<tr><th>Service</th><th>Who signs in?</th><th>Exam keywords</th></tr>
<tr><td>IAM user</td><td>A few people/applications that need long-term credentials</td><td>long-term credentials</td></tr>
<tr><td>IAM Identity Center</td><td>Employees, many AWS accounts</td><td>single sign-on, workforce, multiple accounts</td></tr>
<tr><td>Amazon Cognito</td><td>Customers using your web/mobile app</td><td>sign-up, sign-in for mobile/web app users</td></tr>
<tr><td>AWS Directory Service</td><td>Environments that use Microsoft Active Directory</td><td>managed Microsoft AD</td></tr>
</table>

<div class="box trap"><b>⚠️ Common trap</b><p>The question says "<b>employees</b>" sign in once to many accounts → <b>IAM Identity Center</b>. The question says "<b>users of a mobile app</b>" sign up/sign in → <b>Cognito</b>. Both services are about signing in, so it is very easy to pick the wrong one.</p></div>

<h3>Managing secrets: Secrets Manager and Parameter Store</h3>
<p>Applications often need <b>secrets</b> such as database passwords and API keys. Never write them directly into code. Put them in a dedicated "safe" and have the application ask the safe when it needs them.</p>
<ul>
<li><b>AWS Secrets Manager</b>: built for storing secrets, encrypted with KMS, and its standout feature is <b>automatic rotation</b> (it changes the password on a schedule), with built-in integration for RDS and many databases. It is a paid service.</li>
<li><b>AWS Systems Manager Parameter Store</b>: stores configuration (feature flags, URLs…) and simple secrets; secrets are stored as a <b>SecureString</b> (encrypted with KMS). The standard tier has no additional charge, so it is the <b>cheapest</b> choice when you do not need automatic rotation. It has no built-in automatic rotation like Secrets Manager.</li>
</ul>

<h3>Regular checks: credential report, last accessed, Access Analyzer</h3>
<ul>
<li><b>IAM credential report</b>: a downloadable table (a CSV file) that lists <b>every IAM user</b> in the account and the status of their credentials: when the password was last changed, whether MFA is turned on, when the access keys were last used. Used for audits.</li>
<li><b>IAM access advisor</b> (shown in the console on the <b>Last accessed</b> tab, "last accessed information"): shows which services a user/role <b>has permissions for and when it last actually used</b> each service. The lowest-effort way to remove excess permissions, in support of least privilege.</li>
<li><b>IAM Access Analyzer</b>: finds resources (S3 buckets, KMS keys, IAM roles…) that are <b>shared outside</b> your account or organization, meaning outsiders can access them. It also checks the policies you write and helps find unused permissions.</li>
</ul>

<div class="box exam"><b>🎯 What the exam asks</b><ul>
<li>"Best practice for root user" → <b>Enable MFA, don't use for everyday tasks, no access keys</b></li>
<li>"Only the root user can…" → <b>close account, change account email/root password, restore IAM permissions</b></li>
<li>"Require a code from a device in addition to a password" → <b>MFA</b></li>
<li>"Minimum password length, rotate passwords" → <b>IAM password policy</b></li>
<li>"Use existing corporate credentials" → <b>Identity federation</b>; "employees sign in once to many accounts" → <b>IAM Identity Center</b></li>
<li>"Sign-up/sign-in for mobile app users" → <b>Amazon Cognito</b></li>
<li>"Store database credentials and rotate automatically" → <b>AWS Secrets Manager</b></li>
<li>"List all users and status of passwords, access keys, MFA" → <b>IAM credential report</b></li>
<li>"Which services a role actually used and when" → <b>last accessed information</b> (access advisor); "resources shared with principals outside the organization" → <b>IAM Access Analyzer</b></li>
<li>"Phishing-resistant MFA" → <b>passkeys / FIDO2 security keys</b>; "if the root MFA device is lost" → <b>register a second MFA device</b></li>
<li>"Remove root credentials from member accounts, do root tasks centrally" → <b>centralized root access management</b></li>
<li>"Access key leaked" → <b>deactivate/delete the key</b> + <b>review CloudTrail</b></li>
<li>"Config values, a few encrypted, no rotation, cheapest" → <b>Parameter Store</b> (SecureString)</li>
</ul></div>
`,summary:["The root user has full access: turn on MFA, do not use it day to day, do not create access keys.","Only root can: change the root email/password, close the account (standalone account), activate IAM access to Billing, register as a seller on the RI Marketplace, restore IAM permissions, turn on S3 MFA Delete, fix a bucket policy that blocks all principals. Changing the Support plan does not need root.","In Organizations, centralized root access lets you remove the root credentials of member accounts and perform privileged tasks centrally.","MFA = password + device; passkeys/FIDO2 are phishing-resistant; keep a backup MFA device. The password policy applies to IAM users, not to root.","Access keys are for the CLI/SDK; do not store them on EC2, use an IAM role instead.","IAM Identity Center is for employees (SSO across many accounts); Cognito is for app users; Directory Service is for Microsoft AD.","Secrets Manager stores secrets and rotates them automatically; Parameter Store stores configuration/simple secrets.","The credential report lists the sign-in status of every user; access advisor (last accessed) shows when each permission was last used; Access Analyzer finds resources shared externally."],terms:[["Root user","the account owner identity with full access"],["MFA (Multi-Factor Authentication)","signing in with a password plus a second factor such as a device"],["Password policy","rules for IAM user passwords (length, complexity, expiration)"],["Access key","credentials for the CLI/SDK (key ID + secret key)"],["Identity federation","signing in to AWS with an identity from another system"],["Identity provider (IdP)","the system that authenticates users and vouches for them"],["Single sign-on (SSO)","sign in once to reach many accounts and apps"],["AWS IAM Identity Center","SSO service for employees (formerly AWS SSO)"],["Amazon Cognito","sign-up/sign-in service for application users"],["AWS Directory Service","Microsoft Active Directory service on AWS"],["AWS Secrets Manager","service that stores and rotates secrets"],["Rotation","automatically changing a secret on a schedule"],["IAM credential report","CSV report of every IAM user's credential status"],["IAM access advisor","tool that shows when permissions were last used"],["IAM Access Analyzer","tool that finds resources shared outside the account"],["Phishing-resistant MFA","MFA that fake sites cannot capture (passkeys, FIDO2)"],["Permission set","a reusable set of permissions in IAM Identity Center"]]};
L.course["2-4"]={title:"Protecting networks and applications: Security Groups, NACLs, WAF, Shield",goals:["Understand what a firewall is and tell a security group from a network ACL","Understand DDoS, SQL injection, and XSS in simple words","Know when to use AWS Shield Standard, Shield Advanced, AWS WAF, and AWS Firewall Manager","Know that you can buy third-party security tools on AWS Marketplace"],html:`
<h3>What is a firewall?</h3>
<p>Computers talk to each other over a network by sending <b>traffic</b> (packets of data). Each packet goes to a <b>port</b>, which is like a room number in a building: websites usually use port 443 (HTTPS) and 80 (HTTP), and admin sign-in to a Linux machine uses port 22 (SSH).</p>
<p>A <b>firewall</b> is a "gatekeeper" that looks at each packet and decides whether to let it through or block it, based on <b>rules</b>: from which address, to which port, using which protocol.</p>
<p>On AWS, your servers live in a <b>VPC</b> (Virtual Private Cloud, your own private virtual network), which is divided into <b>subnets</b> (smaller networks inside it). AWS gives you two layers of firewall: one at the door of each server, and one at the gate of each subnet.</p>

<h3>Security groups and network ACLs</h3>
<p>A <b>security group</b> is a virtual firewall attached at the <b>instance level</b> (each EC2 server, or more precisely each network interface). Its characteristics:</p>
<ul>
<li>It has only <b>Allow</b> rules. Anything that is not allowed is blocked. You cannot write a "block this IP" rule.</li>
<li><b>Stateful</b> (it remembers connections): if a request is allowed in, the matching response is automatically allowed out, with no separate rule needed.</li>
<li>By default: all inbound traffic is blocked, and all outbound traffic is allowed.</li>
</ul>
<p>A <b>network ACL</b> (NACL, network access control list) is a firewall at the <b>subnet level</b>. Its characteristics:</p>
<ul>
<li>It has both <b>Allow</b> and <b>Deny</b> rules. You can use it to block one specific bad IP address.</li>
<li><b>Stateless</b> (it does not remember connections): inbound and outbound are checked separately, so you must write rules for both directions.</li>
<li>Rules are evaluated by rule number, from lowest to highest; the first rule that matches is applied.</li>
</ul>

<div class="box idea"><b>🧠 In plain terms</b><p>A <b>NACL</b> is the guard at the <b>gate of the apartment complex</b>: there is a list of who may enter and a blacklist of who is banned, and people are checked both on the way in and on the way out (the guard remembers no faces). A <b>security group</b> is the <b>lock on each apartment door</b>: there is only a list of invited guests; anyone who was invited in is naturally allowed back out without being asked again.</p></div>

<table>
<tr><th>Feature</th><th>Security group</th><th>Network ACL</th></tr>
<tr><td>Where it attaches</td><td>Instance (each server)</td><td>Subnet (the whole subnet)</td></tr>
<tr><td>Rule types</td><td>Allow only</td><td>Allow and Deny</td></tr>
<tr><td>State</td><td>Stateful: return traffic is automatically allowed</td><td>Stateless: both directions must be allowed</td></tr>
<tr><td>Rule evaluation order</td><td>All rules are evaluated</td><td>By rule number, stops at the first match</td></tr>
<tr><td>Use when</td><td>Fine-grained control over who reaches which server</td><td>Blocking a whole IP range at the subnet level</td></tr>
</table>

<div class="box example"><b>🍰 Example: BanhNgon Bakery</b><p>The BanhNgon web server has a security group that allows only port 443 (HTTPS) from anywhere, and port 22 (SSH) only from the IP address of Minh's office. The database sits in its own subnet, and the database's security group only allows traffic coming from the web server's security group.</p><p>One day Minh sees an unfamiliar IP address scanning the site nonstop. Security groups have no Deny rules, so Minh adds a <b>Deny</b> rule for that address to the subnet's <b>network ACL</b>.</p></div>

<h3>Attacks you often hear about: DDoS, SQL injection, XSS</h3>
<ul>
<li><b>DDoS</b> (Distributed Denial of Service): an attacker controls thousands of machines that all send junk requests to a website at once, overloading it so real customers cannot get in. It is like hundreds of people calling the cake order line nonstop so real customers cannot get through.</li>
<li><b>SQL injection</b>: an attacker types a piece of database command into an input field (for example a search box). If the website handles input carelessly, that command actually runs and can steal or delete data.</li>
<li><b>XSS</b> (Cross-Site Scripting): an attacker plants malicious code in a web page (for example in a comment box). When other people open the page, their browser runs that code, and their sign-in session can be stolen.</li>
</ul>

<h3>AWS Shield, AWS WAF, AWS Firewall Manager</h3>
<h4>AWS Shield: DDoS protection</h4>
<ul>
<li><b>AWS Shield Standard</b>: <b>free</b> and <b>automatically enabled</b> for every AWS customer. It protects against common DDoS attacks at the network and transport layers (layer 3/4), for example <b>SYN floods</b> and UDP reflection. You do not need to do anything. For a small website on a tight budget that does not need a response team or cost protection, Shield Standard is enough.</li>
<li><b>AWS Shield Advanced</b>: <b>paid</b>, with enhanced protection for resources such as CloudFront, Route 53, Elastic Load Balancing, EC2, and Global Accelerator. It adds 24/7 support from AWS's DDoS response team (the Shield Response Team), detailed reports, and cost protection when an attack makes your resource usage spike.</li>
</ul>
<h4>AWS WAF: web application firewall</h4>
<p><b>AWS WAF</b> (Web Application Firewall) reads the content of web requests (the application layer, layer 7) and filters them by rules. WAF attaches to <b>Amazon CloudFront, Application Load Balancer, Amazon API Gateway</b>, and some other services. Common rule types:</p>
<ul>
<li>Block <b>SQL injection and XSS</b> in the request content.</li>
<li>Block/allow by <b>IP address</b> or by <b>country</b> (geo match).</li>
<li><b>Rate-based rule</b>: automatically blocks an IP when it sends more than the allowed number of requests in a short time. A good fit against password guessing (brute force) on a login page or an HTTP flood from a few sources sending rapid-fire requests (the rule counts requests per IP and automatically blocks IPs over the threshold).</li>
<li><b>Managed rule groups</b> (ready-made rule sets): from AWS, or built and updated by <b>third-party security vendors</b> and sold on <b>AWS Marketplace</b>, charged to your AWS bill. You do not have to write the rules yourself.</li>
</ul>
<h4>AWS Firewall Manager: central management</h4>
<p>When a company has many AWS accounts, setting up each WAF rule or security group in every account is tiring and it is easy to miss one. <b>AWS Firewall Manager</b> lets you define firewall rules (WAF, Shield Advanced, security groups, Network Firewall…) <b>once</b> and apply them to <b>every account in AWS Organizations</b>, including accounts and resources created later.</p>
<div class="flow"><span>User</span><span>Shield (DDoS protection)</span><span>WAF (filters web requests)</span><span>NACL (subnet)</span><span>Security group (server)</span></div>

<div class="box trap"><b>⚠️ Common trap</b><p><b>Shield</b> defends against <b>DDoS</b>; <b>WAF</b> defends against <b>SQL injection and XSS</b> and filters web requests. The exam likes to put the two side by side. If the question says "free, automatically enabled" → Shield <b>Standard</b>. If the question says "24/7 DDoS response team" or "cost protection" → Shield <b>Advanced</b>.</p></div>

<h3>Third-party security tools: AWS Marketplace</h3>
<p>Besides AWS's own services, you can use products from other security vendors (next-generation firewalls, intrusion detection, antivirus…). <b>AWS Marketplace</b> is a software "marketplace" where you find, buy, and deploy these products on AWS, and <b>the cost is added to your AWS bill</b>.</p>

<div class="box exam"><b>🎯 What the exam asks</b><ul>
<li>"Stateful, instance level" → <b>Security group</b></li>
<li>"Stateless, subnet level, allow and deny rules" → <b>Network ACL</b></li>
<li>"Block a specific IP address at the subnet" → <b>Network ACL</b> (or AWS WAF if it is a web application)</li>
<li>"DDoS protection, free, automatic for all customers" → <b>AWS Shield Standard</b></li>
<li>"SQL injection, cross-site scripting, filter web requests" → <b>AWS WAF</b></li>
<li>"Centrally manage firewall rules across accounts in AWS Organizations" → <b>AWS Firewall Manager</b></li>
<li>"Buy third-party security software billed through AWS" → <b>AWS Marketplace</b>; "WAF rule set built by a third-party vendor" → <b>AWS Marketplace</b> (managed rule group)</li>
<li>"Block IPs that send too many requests in a short time", "password-guessing on login page" → <b>AWS WAF rate-based rule</b></li>
<li>"Block requests from specific countries" → <b>AWS WAF</b> (geo match)</li>
<li>"24/7 Shield Response Team, DDoS cost protection" → <b>AWS Shield Advanced</b></li>
<li>"SQL injection + DDoS team + auto-apply to new accounts in Organizations" → <b>WAF + Shield Advanced + Firewall Manager</b></li>
</ul></div>
`,summary:["A firewall inspects traffic and allows or blocks it based on rules (address, port, protocol).","Security group: instance level, stateful, Allow rules only.","Network ACL: subnet level, stateless, both Allow and Deny rules, evaluated by rule number.","AWS Shield Standard is free and automatically protects against DDoS; Shield Advanced is paid and includes a 24/7 support team.","AWS WAF blocks SQL injection and XSS, filters by IP/country, and uses rate-based rules to block IPs that send too many requests; it attaches to CloudFront, ALB, and API Gateway; managed rule groups come from AWS and from third-party vendors on Marketplace.","AWS Firewall Manager centrally manages firewall rules for many accounts in AWS Organizations.","AWS Marketplace is where you buy third-party security tools, charged to your AWS bill."],terms:[["Firewall","a gatekeeper that allows or blocks network traffic by rules"],["Port","a numbered endpoint for network traffic on a machine"],["VPC (Virtual Private Cloud)","your own private virtual network on AWS"],["Subnet","a smaller network inside a VPC"],["Security group","an instance-level virtual firewall"],["Network ACL (NACL)","a subnet-level firewall with allow and deny rules"],["Stateful","remembers connections, so return traffic is allowed automatically"],["Stateless","does not remember connections; each direction needs its own rule"],["DDoS (Distributed Denial of Service)","flooding a site with traffic from many machines to take it down"],["SQL injection","an attack that slips database commands into input fields"],["Cross-site scripting (XSS)","an attack that plants malicious code in a web page"],["AWS Shield","the DDoS protection service"],["AWS WAF (Web Application Firewall)","a firewall that filters web requests"],["AWS Firewall Manager","central firewall management across accounts"],["Rate-based rule","a WAF rule that blocks sources sending too many requests"],["AWS Marketplace","a store for third-party software on AWS"]]};
L.course["2-5"]={title:"Detecting and investigating threats: GuardDuty, Inspector, Macie, Detective, Security Hub",goals:["Know the main job of GuardDuty, Inspector, Macie, Detective, and Security Hub","Quickly tell the five services apart using keywords in the question","Understand how Trusted Advisor helps with security"],html:`
<h3>Why do you need "detection" services?</h3>
<p>In lessons 2-2 through 2-4, you set permissions, turned on MFA, and built firewalls. Those are <b>preventive</b> measures. But no fence is perfect: passwords can still leak, software can still have new vulnerabilities, and an employee can still accidentally put sensitive data somewhere public.</p>
<p>That is why you also need <b>detective</b> controls: they watch continuously, look for unusual signs, and alert you. AWS has a "security team" made up of several services, each with its own specialty. The result that each service reports is usually called a <b>finding</b> (a detected issue or alert).</p>

<div class="box idea"><b>🧠 In plain terms</b><p>Picture a shopping mall with a security team:</p><ul>
<li><b>GuardDuty</b> is the <b>person watching the cameras</b>, day and night, to spot suspicious behavior (someone hanging around at 3 a.m.).</li>
<li><b>Inspector</b> is the <b>lock inspector</b>, going door to door to see which locks are old and easy to break.</li>
<li><b>Macie</b> is the <b>person checking the document safe</b>, looking for ID papers and card numbers left lying around.</li>
<li><b>Detective</b> is the <b>detective</b>, who traces the clues after an incident to find the cause.</li>
<li><b>Security Hub</b> is the <b>command room</b>, pulling everyone's reports onto one big screen.</li>
</ul></div>

<h3>Amazon GuardDuty: threat detection</h3>
<p><b>Amazon GuardDuty</b> is a <b>threat detection</b> service. It continuously analyzes log sources such as <b>AWS CloudTrail</b> (the log of actions in your account), <b>VPC Flow Logs</b> (the log of network traffic), and <b>DNS logs</b> (the log of domain name lookups). It uses <b>machine learning</b> and lists of known malicious addresses to find anything unusual.</p>
<p>Example findings: an EC2 server is talking to an IP address known to belong to a crypto miner, or API calls are coming from an unfamiliar country in the middle of the night. Turning on GuardDuty takes just a few clicks, and you do not have to install software (an agent) on your servers.</p>
<p>GuardDuty also has extended protection features. The one most worth remembering is <b>S3 Protection</b>: it monitors data access activity in S3 buckets (S3 data events) and alerts you when objects are read from a known malicious IP, or when an unusual access pattern suggests that credentials are being misused to pull data out.</p>
<div class="box trap"><b>⚠️ Common trap</b><p>Both GuardDuty S3 Protection and Macie are "about S3", but they answer two different questions. <b>Macie</b>: what sensitive data is <b>inside</b> the bucket (card numbers, passports, PII)? <b>GuardDuty S3 Protection</b>: <b>who is accessing</b> the bucket in a suspicious way (malicious IPs, misused credentials)?</p></div>

<h3>Amazon Inspector: finding software vulnerabilities</h3>
<p>A <b>vulnerability</b> is a weakness in software that an attacker can exploit. New vulnerabilities are publicly disclosed every day.</p>
<p><b>Amazon Inspector</b> <b>automatically and continuously scans</b> <b>EC2 instances</b>, <b>container images</b> in Amazon ECR, and <b>Lambda functions</b> for known software vulnerabilities (CVEs, including those in open-source libraries your code uses) and for unintended network exposure. When a new vulnerability is disclosed, Inspector rescans on its own, so you quickly learn which Lambda functions or images are affected. It assigns a severity score so you know what to patch first.</p>
<p><i>Update: since June 2025, Inspector also offers <b>code security</b>: it scans source code repositories (for example GitHub, GitLab) to find flaws in code you wrote (SAST), vulnerabilities in dependencies (SCA), and misconfigurations in infrastructure as code templates (IaC).</i></p>

<h3>Amazon Macie: finding sensitive data</h3>
<p><b>PII</b> (Personally Identifiable Information) is data that can identify a person: a full name with an address, a phone number, a bank card number, and so on.</p>
<p><b>Amazon Macie</b> uses machine learning and pattern matching to <b>find sensitive data such as PII in Amazon S3</b>. It also alerts you to buckets that are public or unencrypted. Remember: Macie goes with <b>S3</b> and <b>sensitive data</b>.</p>

<h3>Amazon Detective and AWS Security Hub</h3>
<p><b>Amazon Detective</b> helps you <b>investigate</b>. When GuardDuty says "something is wrong", you need to know where it started, which resources are involved, and how long it has been going on. Detective automatically gathers log data and draws it as relationship graphs so you can find the <b>root cause</b> (the underlying reason).</p>
<p><b>AWS Security Hub</b> is the <b>central</b> place. It collects alerts from GuardDuty, Inspector, Macie, and many other services (including partner products), across <b>multiple accounts</b>, into one screen. It also automatically checks your configuration against security standards (for example AWS Foundational Security Best Practices, <b>CIS AWS Foundations Benchmark</b>) and gives your security posture a score.</p>
<p><i>Naming update: the new version of Security Hub was introduced in preview in June 2025 and became generally available (GA) on December 2, 2025. Since then, the standards-based configuration checks are called <b>AWS Security Hub CSPM</b>, while the name AWS Security Hub is used for the new version that aggregates and prioritizes risks from GuardDuty, Inspector, Macie, and Security Hub CSPM. For the exam, just remember: "centralized view of findings, compliance checks across accounts" → Security Hub.</i></p>

<table>
<tr><th>Service</th><th>Question it answers</th><th>Target / source</th><th>Keywords in the question</th></tr>
<tr><td>GuardDuty</td><td>Is anyone doing something suspicious?</td><td>CloudTrail, VPC Flow Logs, DNS logs</td><td>threat detection, malicious activity, ML</td></tr>
<tr><td>Inspector</td><td>Does my software have vulnerabilities?</td><td>EC2, container images (ECR), Lambda, source code repositories (code security)</td><td>vulnerabilities, CVE, automated scanning</td></tr>
<tr><td>Macie</td><td>Where is my sensitive data?</td><td>Amazon S3</td><td>PII, sensitive data</td></tr>
<tr><td>Detective</td><td>What happened, and why?</td><td>Log data and findings</td><td>investigate, root cause</td></tr>
<tr><td>Security Hub</td><td>How is my overall security?</td><td>Findings from many services and many accounts</td><td>centralized view, security posture</td></tr>
</table>

<div class="box example"><b>🍰 Example: BanhNgon Bakery</b><p>BanhNgon now has an ordering app and stores customers' delivery details on S3. Minh turns on the whole security team:</p><ul>
<li><b>Macie</b> reports: an Excel file with customers' names and phone numbers is sitting in the public product-photo bucket. Minh moves it right away.</li>
<li><b>Inspector</b> reports: the EC2 server is using a library with a Critical vulnerability. Minh applies the patch.</li>
<li><b>GuardDuty</b> reports: there was an API login from an unfamiliar IP address. Minh opens <b>Detective</b> and traces it to an old access key that was leaked online, then deactivates that key.</li>
<li>Every alert shows up together in <b>Security Hub</b>, so Lan only needs to look at one screen to know how things stand.</li>
</ul></div>

<div class="box trap"><b>⚠️ Common trap</b><p><b>GuardDuty</b> (detects suspicious behavior that is happening) and <b>Inspector</b> (finds vulnerabilities in software) are very often confused. Asked about "vulnerabilities" → Inspector. Asked about "threats, malicious activity, analyzing logs" → GuardDuty.</p><p><b>Detective</b> (investigates the cause) and <b>GuardDuty</b> (detects) are also easy to mix up: GuardDuty raises the alarm, and Detective helps you investigate afterward.</p></div>

<h3>Trusted Advisor: an automated consultant</h3>
<p><b>AWS Trusted Advisor</b> checks your account and gives recommendations in several categories: cost optimization, performance, <b>security</b>, fault tolerance, service limits (service quotas), and operations.</p>
<p>Some typical security checks: S3 buckets with open access permissions, security groups that open sensitive ports to the whole Internet, a root user without MFA, IAM not being used, and public EBS/RDS snapshots. The <b>core security checks</b>, such as security groups with unrestricted ports, root without MFA, S3 bucket permissions, IAM use, and public snapshots, are <b>free for every account, including the Basic Support plan</b>. The full set of checks depends on your AWS Support plan (see the official page for details).</p>

<div class="box exam"><b>🎯 What the exam asks</b><ul>
<li>"Uses ML to analyze CloudTrail, VPC Flow Logs, DNS logs to detect threats" → <b>Amazon GuardDuty</b></li>
<li>"Automatically scans EC2 instances and container images for vulnerabilities" → <b>Amazon Inspector</b></li>
<li>"Discover and protect PII / sensitive data in S3" → <b>Amazon Macie</b></li>
<li>"Investigate root cause of suspicious activity" → <b>Amazon Detective</b></li>
<li>"Centralized view of security alerts across multiple accounts" → <b>AWS Security Hub</b></li>
<li>"Recommendations: open security group ports, root MFA, S3 bucket permissions" (even with Basic Support, at no extra cost) → <b>AWS Trusted Advisor</b></li>
<li>"Alert when S3 objects are read from malicious IPs / credentials misused to pull data" → <b>GuardDuty S3 Protection</b>; "which buckets contain credit card or passport numbers" → <b>Macie</b></li>
<li>"Find Lambda functions and ECR images with a vulnerable library, continuously" → <b>Amazon Inspector</b></li>
<li>"Compare accounts against CIS Benchmark + one place for GuardDuty/Inspector/Macie findings" → <b>AWS Security Hub</b></li>
<li>"Check configuration against CIS / AWS Foundational Security Best Practices (FSBP)" → if <b>AWS Security Hub CSPM</b> is among the options, choose it; if not, choose <b>AWS Security Hub</b></li>
</ul></div>
`,summary:["GuardDuty: detects threats with ML from CloudTrail, VPC Flow Logs, and DNS logs, with no agent needed; S3 Protection detects suspicious S3 access (unlike Macie, which finds sensitive data).","Inspector: automatically scans for software vulnerabilities on EC2, container images, and Lambda (and, since 2025, source code repositories too).","Macie: finds sensitive data (PII) in S3.","Detective: investigates and finds the root cause of security incidents.","Security Hub: collects alerts from many services and many accounts, and scores you against security standards.","Trusted Advisor has free core security checks (even with Basic Support) such as open ports, root without MFA, and open S3 buckets."],terms:[["Threat detection","spotting signs of attacks or malicious activity"],["Finding","an issue or alert reported by a security service"],["Vulnerability","a weakness in software that attackers can exploit"],["PII (Personally Identifiable Information)","data that can identify a specific person"],["Sensitive data","data that must be protected, such as personal or financial details"],["Root cause","the underlying reason an incident happened"],["Security posture","the overall state of your security"],["Machine learning","software that learns patterns from data"],["VPC Flow Logs","logs of network traffic in a VPC"],["Amazon GuardDuty","threat detection service"],["Amazon Inspector","vulnerability scanning service"],["Amazon Macie","service that finds sensitive data in S3"],["Amazon Detective","service for investigating security incidents"],["AWS Security Hub","central place that gathers security alerts"],["AWS Trusted Advisor","tool that gives best-practice recommendations"]]};
L.course["2-6"]={title:"Data encryption: at rest, in transit, KMS, CloudHSM, ACM",goals:["Understand what encryption is and why you need it","Tell encryption at rest apart from encryption in transit","Know when to use AWS KMS, AWS CloudHSM, and AWS Certificate Manager","Understand who manages the keys in each option"],html:`
<h3>What is encryption?</h3>
<p><b>Encryption</b> turns readable data into a meaningless string of characters. Only someone with the right <b>key</b> can turn it back (<b>decryption</b>). Data that is not encrypted is called <b>plaintext</b>, and encrypted data is called <b>ciphertext</b>.</p>
<p>Encryption does not stop an attacker from getting the data, but it makes the stolen data <b>useless</b> if they do not have the key. That is why <b>protecting the key</b> matters just as much as encrypting.</p>

<div class="box idea"><b>🧠 In plain terms</b><p>Encryption is like putting your papers in a <b>locked box</b>. A thief can carry the whole box away, but without the key they cannot read anything. Whoever holds the key is the one who really controls the papers.</p></div>

<h3>At rest and in transit</h3>
<p>Data has two main states, and you need to protect it in both:</p>
<ul>
<li><b>Data at rest</b> (stored data): data that is "sitting still" on a disk, in a database, in an S3 bucket, or in a backup. Encryption at rest protects you when someone gets hold of the disk or the backup file. On AWS, many services support encryption at rest, for example <b>S3, EBS, RDS, DynamoDB</b>, usually integrated with AWS KMS. Since 2023, S3 automatically encrypts every new object.</li>
<li><b>Data in transit</b> (data being sent): data that is "moving" across a network, for example from a customer's browser to a website, or between two servers. Encryption in transit uses the <b>TLS</b> protocol (Transport Layer Security, formerly called SSL). When a website uses <b>HTTPS</b> (the padlock icon in the browser), the data is being encrypted in transit. For the connection between <b>your office/data center and a VPC over the Internet</b>, you use <b>AWS Site-to-Site VPN</b>, which creates encrypted <b>IPsec</b> "tunnels".</li>
</ul>
<table>
<tr><th></th><th>At rest</th><th>In transit</th></tr>
<tr><td>Where the data is</td><td>Disks, databases, S3, backups</td><td>Traveling over the network</td></tr>
<tr><td>Protects against</td><td>Lost disks, leaked backup files</td><td>Eavesdropping on the connection</td></tr>
<tr><td>Typical AWS tools</td><td>AWS KMS, CloudHSM, the encryption features of S3/EBS/RDS</td><td>TLS/HTTPS (certificates from ACM), Site-to-Site VPN (IPsec)</td></tr>
</table>
<h4>Ways to encrypt data in Amazon S3</h4>
<table>
<tr><th>Method</th><th>Who encrypts / who holds the key</th><th>Notes</th></tr>
<tr><td><b>SSE-S3</b> (server-side encryption with keys managed by S3)</td><td>S3 encrypts the data when storing it and takes care of the keys itself</td><td><b>The default</b>: you upload without specifying anything and the bucket has no configuration → the object is still encrypted with SSE-S3</td></tr>
<tr><td><b>SSE-KMS</b></td><td>S3 encrypts with a key in AWS KMS</td><td>You control who may use the key, and every use of the key is logged in CloudTrail</td></tr>
<tr><td><b>Client-side encryption</b></td><td><b>You</b> encrypt before uploading</td><td>S3 only receives data that is already encrypted</td></tr>
</table>
<p>You can set the bucket's <b>default encryption</b> to SSE-KMS if you want to use your own key. Besides encryption, S3 also has <b>S3 Object Lock</b>: it locks objects using the <b>WORM</b> model (write once, read many: written once, and nobody can change or delete it) for a retention period, which is useful for legal record-keeping requirements.</p>

<div class="box idea"><b>🧠 In plain terms</b><p>Encryption <b>at rest</b> is like the safe in the shop: it guards the money while the money sits still. Encryption <b>in transit</b> is like an <b>armored cash truck</b>: it protects the money on the road from the shop to the bank.</p></div>

<h3>AWS KMS: the key management service</h3>
<p><b>AWS Key Management Service (KMS)</b> helps you <b>create, store, manage, and control the use of</b> encryption keys. Keys are protected in secure hardware devices operated by AWS, and a key never leaves KMS unencrypted.</p>
<ul>
<li>It integrates with a great many services: turning on encryption for S3, EBS, or RDS takes just a few choices.</li>
<li>You use IAM policies and the <b>key policy</b> to decide who may use which key.</li>
<li>Every use of a key is recorded in <b>AWS CloudTrail</b>, so it can be audited.</li>
<li>There are three kinds of KMS keys: the <b>customer managed key</b> (a key you create and control, with a monthly fee), the <b>AWS managed key</b> (it lives in your account, AWS creates and manages it for you for one service, its alias looks like <code>aws/s3</code>, and you can view it but cannot change its settings), and the <b>AWS owned key</b> (it lives in the AWS service's own account, is shared across many customers, you cannot see or manage it, and it is completely free; many services use this kind for default encryption).</li>
</ul>
<p>The <b>customer managed key</b> is the answer when a question asks for "keys the company controls": you write the key policy, turn on <b>automatic key rotation</b> (once a year by default), <b>disable</b> the key or schedule its deletion, and use one key across several services; every use shows up in CloudTrail. KMS does <b>not</b> provide an HSM dedicated to a single customer; for that you need CloudHSM.</p>

<h3>AWS CloudHSM: your own key hardware</h3>
<p>An <b>HSM</b> (Hardware Security Module) is a specialized device for storing keys and performing encryption, designed to resist physical tampering.</p>
<p><b>AWS CloudHSM</b> lets you rent a <b>dedicated</b> HSM (single-tenant, not shared with other customers) in the AWS Cloud. <b>You</b> have full control over the keys and users on the HSM; AWS only takes care of the hardware and cannot access your keys. Use it when a legal or contractual requirement says you must fully control your keys on dedicated hardware.</p>
<table>
<tr><th></th><th>AWS KMS</th><th>AWS CloudHSM</th></tr>
<tr><td>Hardware</td><td>Managed by AWS, shared infrastructure</td><td>An HSM dedicated to you</td></tr>
<tr><td>Who manages the keys</td><td>AWS runs the service; you control who may use the keys</td><td>You manage them entirely yourself</td></tr>
<tr><td>Ease of use</td><td>Very easy, built into many services</td><td>Takes more effort</td></tr>
<tr><td>When to choose it</td><td>Most cases</td><td>Strict compliance requirements that need a dedicated HSM</td></tr>
</table>

<h3>AWS Certificate Manager and HTTPS</h3>
<p>For a website to run on HTTPS, you need an <b>SSL/TLS certificate</b> (a digital certificate). It is like an "ID card" proving the website really is yours, and it lets the browser encrypt the connection.</p>
<p><b>AWS Certificate Manager (ACM)</b> helps you <b>provision, manage, and automatically renew</b> SSL/TLS certificates. Public certificates issued by ACM are free when used with integrated services such as <b>Elastic Load Balancing, Amazon CloudFront, Amazon API Gateway</b>. You no longer have to worry about forgetting to renew and having your website show a "not secure" warning.</p>

<div class="box example"><b>🍰 Example: BanhNgon Bakery</b><p>Customers ordering from BanhNgon type their address and phone number on the website. Minh uses <b>ACM</b> to issue a certificate for banhngon.vn and attaches it to the load balancer, so all data from the customer's browser to the server is encrypted <b>in transit</b> over HTTPS.</p><p>The order database on RDS and the server's EBS volume have encryption <b>at rest</b> turned on with a key in <b>KMS</b>. Minh creates a customer managed key and allows only the application's role to use it. Only when BanhNgon expands to Japan and a payment partner requires the keys to sit on a dedicated HSM does Minh consider <b>CloudHSM</b>.</p></div>

<div class="box trap"><b>⚠️ Common trap</b><p>The question says "<b>dedicated</b> hardware security module", "single-tenant", "full control of keys" → <b>CloudHSM</b>. The question only says "create and manage encryption keys" → <b>KMS</b>.</p><p><b>ACM</b> manages <b>certificates</b> (for HTTPS, in transit). It is <b>not</b> where you manage keys for encrypting data at rest. And remember: turning on encryption for your data is the customer's responsibility in the shared responsibility model.</p></div>

<div class="box exam"><b>🎯 What the exam asks</b><ul>
<li>"Create and manage encryption keys", "encrypt data at rest in S3/EBS" → <b>AWS KMS</b></li>
<li>"Dedicated HSM", "regulatory requirement to control keys on dedicated hardware" → <b>AWS CloudHSM</b></li>
<li>"Encrypt data in transit between browsers and website", "provision SSL/TLS certificates" → <b>AWS Certificate Manager (ACM)</b></li>
<li>"Data stored on disk" → <b>at rest</b>; "data moving over the network" → <b>in transit</b></li>
<li>"Ways to encrypt S3 objects at rest" → <b>SSE-S3, SSE-KMS, client-side encryption</b>; "no encryption specified" → <b>SSE-S3</b> by default</li>
<li>"Encrypt traffic between on-premises and VPC over the internet" → <b>Site-to-Site VPN (IPsec)</b></li>
<li>"Keys the company controls, automatic yearly rotation, disable, CloudTrail audit" → <b>KMS customer managed keys</b></li>
<li>"Encrypt EBS at rest + HTTPS to the load balancer" → <b>EBS encrypted with KMS key</b> + <b>HTTPS listener with ACM certificate</b></li>
<li>"Who is responsible for enabling encryption of customer data?" → <b>Customer</b></li>
</ul></div>
`,summary:["Encryption turns data into a form that cannot be read without the key; protecting the key is the heart of it.","At rest = data being stored (S3, EBS, RDS); in transit = data being sent (TLS/HTTPS, Site-to-Site VPN IPsec).","S3: SSE-S3 by default; you can use SSE-KMS or encrypt on the client side yourself; S3 Object Lock prevents changes/deletion (WORM).","AWS KMS creates and manages keys, integrates with many services, and records every key use in CloudTrail; a customer managed key allows automatic rotation and disabling.","AWS CloudHSM provides a dedicated HSM, and the customer manages the keys entirely.","AWS Certificate Manager provisions, manages, and automatically renews SSL/TLS certificates for HTTPS.","Turning on and managing data encryption is the customer's responsibility."],terms:[["Encryption","scrambling data so only someone with the key can read it"],["Decryption","turning encrypted data back into readable form"],["Encryption key","the secret value used to encrypt and decrypt data"],["Plaintext / ciphertext","original readable data / encrypted data"],["Data at rest","data while it is stored"],["Data in transit","data while it travels over a network"],["TLS (Transport Layer Security)","protocol that encrypts network connections"],["HTTPS","the encrypted version of the web protocol"],["AWS KMS (Key Management Service)","service for creating and managing encryption keys"],["Customer managed key","a KMS key the customer creates and controls"],["HSM (Hardware Security Module)","tamper-resistant hardware device that stores keys"],["AWS CloudHSM","a dedicated HSM on AWS"],["SSL/TLS certificate","digital certificate that proves a site's identity and enables HTTPS"],["SSE-S3 / SSE-KMS","S3 server-side encryption with S3-managed keys / KMS keys"],["S3 Object Lock","locks objects so they cannot be changed or deleted (WORM)"],["AWS Certificate Manager (ACM)","service that manages SSL/TLS certificates"]]};
L.course["2-7"]={title:"Monitoring, auditing, and compliance: CloudTrail, CloudWatch, Config, Artifact",goals:["Clearly tell CloudTrail, CloudWatch, and Config apart","Know where the different security logs live","Understand what compliance is, what AWS Artifact is for, and how to choose a Region to meet data residency","Know the official AWS sources of security information"],html:`
<h3>Three "logbooks" that are easy to confuse</h3>
<p>Once you have prevention and detection in place, you still need <b>records</b> to know how the system is running and who did what. That is the job of three services with similar-sounding names, and the exam <b>loves</b> to make you tell them apart.</p>
<p>First, one concept: on AWS, every action (creating a server, deleting a file, changing permissions), whether you click in the web console or run a command, is an <b>API call</b> (a request to AWS's programming interface) sent to AWS.</p>
<h4>AWS CloudTrail: who did what, and when</h4>
<p><b>AWS CloudTrail</b> records <b>the API calls</b> in your account: <b>who</b> (which user/role), did <b>what</b>, <b>when</b>, from <b>which IP address</b>, and on which resource. It is the main tool for <b>auditing</b> and investigation. CloudTrail is on by default: you can view the last 90 days of management events (<b>Event history</b>). To keep records longer (for example 7 years for legal reasons), create a <b>trail</b> that writes log files to an S3 bucket, and keep them as long as you like. Three trail features often show up on the exam:</p>
<ul>
<li><b>Log file integrity validation</b>: CloudTrail creates digitally signed "digest" files that help you <b>prove</b> the log files in S3 were <b>not modified or deleted</b> after they were written.</li>
<li><b>Organization trail</b>: created from the <b>management account</b> of AWS Organizations, it automatically logs <b>every current and future member account</b> to one central place; admins in member accounts <b>cannot turn off or delete</b> this trail.</li>
<li>It also records <b>the use of KMS keys</b>: who (which IAM principal) used which key, and when.</li>
</ul>
<h4>Amazon CloudWatch: is the system healthy</h4>
<p><b>Amazon CloudWatch</b> monitors <b>performance and operational health</b>: it collects <b>metrics</b> (measurements such as CPU %, request count, latency) and <b>logs</b> (application logs through CloudWatch Logs), and lets you create <b>alarms</b> (alerts when a metric crosses a threshold) and <b>dashboards</b> (monitoring boards).</p>
<h4>AWS Config: how the configuration changed, and whether it follows the rules</h4>
<p><b>AWS Config</b> records <b>the configuration of your resources over time</b> (for example, which ports this security group had open yesterday and which it has open today) and uses <b>Config rules</b> to <b>continuously</b> evaluate whether resources <b>comply</b> with the rules you set (for example "every EBS volume must be encrypted", "no S3 bucket may be public"). A Config rule can also have a <b>remediation action</b> attached (a fix that runs through Systems Manager Automation) to <b>automatically fix</b> a noncompliant resource, for example turning off a bucket's public read access, with no need to write your own scheduled job.</p>

<div class="box idea"><b>🧠 In plain terms</b><p>Think of a bakery:</p><ul>
<li><b>CloudTrail</b> is the <b>security camera + entry logbook</b>: it records who opened the safe and at what time.</li>
<li><b>CloudWatch</b> is the <b>thermometer and gauges</b> on the oven: how hot the oven is, with a bell that rings when it crosses the limit.</li>
<li><b>Config</b> is a <b>daily photo of how the shop is laid out</b> plus the rulebook: it compares today with yesterday and points out what breaks the rules ("the fire extinguisher was moved from its spot").</li>
</ul></div>

<table>
<tr><th></th><th>AWS CloudTrail</th><th>Amazon CloudWatch</th><th>AWS Config</th></tr>
<tr><td>Question it answers</td><td><b>Who</b> did what, and when?</td><td>Is the system <b>healthy</b>? How is performance?</td><td>How has the configuration <b>changed</b>? Does it <b>follow the rules</b>?</td></tr>
<tr><td>What it records</td><td>API calls, user activity</td><td>Metrics, logs, events</td><td>The configuration state of resources over time</td></tr>
<tr><td>Standout features</td><td>Event history, trails stored in S3</td><td>Alarms, dashboards, CloudWatch Logs</td><td>Config rules, configuration history</td></tr>
<tr><td>Keywords in the question</td><td>audit, who made the change, API activity</td><td>monitor performance, CPU, alarm, metrics</td><td>configuration changes, compliance with rules, resource inventory</td></tr>
</table>

<div class="box trap"><b>⚠️ Common trap</b><p>Question: "Who deleted the S3 bucket?" → <b>CloudTrail</b> (not Config). Question: "How has this security group's configuration changed over time, and does it follow the rules?" → <b>Config</b>. Question: "Alert when CPU goes above 80%" → <b>CloudWatch</b>. Tip: see the word <b>who</b> → CloudTrail; <b>performance/alarm</b> → CloudWatch; <b>configuration/compliance rules</b> → Config.</p></div>

<h3>Where do the security logs live?</h3>
<ul>
<li><b>AWS CloudTrail logs</b>: API activity in the account (who did what).</li>
<li><b>Amazon CloudWatch Logs</b>: application and operating system logs; it can also receive logs from many other services for searching and alerting.</li>
<li><b>VPC Flow Logs</b>: information about IP traffic going into and out of the network interfaces in a VPC (from where to where, and whether it was allowed or blocked).</li>
<li><b>Amazon S3 server access logs</b>: a record of the access requests made to an S3 bucket.</li>
</ul>
<p>These logs are usually stored in S3 or CloudWatch Logs, and they are also data sources for GuardDuty and Detective from lesson 2-5.</p>
<p><b>Instant alerts</b>: logs are only useful if someone reads them. To "send an email within minutes when anyone signs in to the console as root", combine two services: <b>Amazon EventBridge</b> (catches events from CloudTrail using a rule, for example the root sign-in event) → <b>Amazon SNS</b> (Simple Notification Service, which sends email/SMS to subscribers).</p>
<div class="flow"><span>Root signs in</span><span>CloudTrail records the event</span><span>EventBridge rule matches</span><span>SNS sends an email</span></div>

<div class="box example"><b>🍰 Example: BanhNgon Bakery</b><p>One morning, the product photos on the BanhNgon website are gone. Minh opens <b>CloudTrail</b> and sees that an intern's user deleted the photo folder at 11:10 p.m. last night. Minh then checks <b>AWS Config</b> and discovers that last week someone opened port 22 on the server to the whole Internet; a Config rule marks this resource as "noncompliant". Meanwhile, <b>CloudWatch</b> had already sent an alert last night because the number of 404 errors on the website shot up.</p></div>

<h3>Compliance and AWS Artifact</h3>
<p><b>Compliance</b> means meeting the laws, regulations, and standards that your industry or country requires. Independent organizations audit providers and issue certifications. Here are some names you will see often; you only need to recognize them:</p>
<ul>
<li><b>SOC</b> (System and Organization Controls): independent audit reports on a service provider's controls.</li>
<li><b>PCI DSS</b>: a security standard for organizations that handle <b>payment card</b> data.</li>
<li><b>ISO/IEC 27001</b>: an international standard for information security management systems.</li>
<li><b>HIPAA</b>: a US law on protecting <b>health information</b>.</li>
</ul>
<p>AWS holds many certifications for its own infrastructure. But under the shared responsibility model, AWS infrastructure being compliant <b>does not mean</b> your application is automatically compliant. Also, <b>compliance varies by service</b>: not every service is in scope for every program (AWS has a "Services in Scope" page where you can look this up).</p>
<p><b>AWS Artifact</b> is a free, self-service portal with two parts:</p>
<ul>
<li><b>Artifact Reports</b>: <b>download AWS's compliance reports</b> (such as SOC reports, PCI reports, ISO certifications). When an auditor asks you to "prove your cloud provider is compliant", this is where you go.</li>
<li><b>Artifact Agreements</b>: review, accept, and manage <b>agreements</b> with AWS for your account (or your whole organization), for example the <b>BAA</b> (Business Associate Addendum) that HIPAA requires before you process health information (PHI) on AWS.</li>
</ul>
<p><b>AWS Audit Manager</b> (a passing familiarity is enough) helps you continuously collect evidence from <b>your own</b> use of AWS to prepare for audits.</p>
<p><i>Note: Audit Manager has moved into <b>maintenance mode</b> and stopped accepting new accounts on <b>April 30, 2026</b> (existing customers can still use it). AWS suggests using <b>conformance packs</b> in <b>AWS Config</b> instead. For the exam, still remember: "continuously collect evidence for audits" → Audit Manager.</i></p>

<h3>Data residency and sources of security information</h3>
<p><b>Data residency</b> is a requirement that data must stay within a particular country or region. On AWS, <b>you choose the Region</b> where your data is stored, and AWS does not move your data out of that Region on its own unless you configure it to. So, to meet a data residency law, store your data in a Region located in that country.</p>
<p>When you need to learn about security on AWS, these are the official sources:</p>
<ul>
<li><b>AWS Security Center</b> (AWS's security site): an overview of security and compliance, plus best-practice documents.</li>
<li><b>AWS Security Blog</b>: articles on best practices, new security features, and sample solutions.</li>
<li><b>AWS Knowledge Center</b> (now part of <b>AWS re:Post</b>): articles written by AWS that walk step by step through common errors and questions, based on real questions customers send to AWS Support. Hit a common error (for example, cross-account S3 permissions not working) → look here first.</li>
<li>In addition: the AWS documentation, Trusted Advisor, and Security Hub also give security recommendations.</li>
</ul>

<div class="box exam"><b>🎯 What the exam asks</b><ul>
<li>"Record API calls to audit who did what and when" → <b>AWS CloudTrail</b></li>
<li>"Monitor CPU, set alarms, collect metrics and logs" → <b>Amazon CloudWatch</b></li>
<li>"Record configuration changes and evaluate against desired configurations" → <b>AWS Config</b></li>
<li>"Capture information about IP traffic in a VPC" → <b>VPC Flow Logs</b></li>
<li>"Download AWS SOC/PCI compliance reports" → <b>AWS Artifact</b></li>
<li>"Keep data within a country" → <b>Choose an AWS Region in that country</b></li>
<li>"Articles about security best practices and new features" → <b>AWS Security Blog</b>; "AWS-maintained step-by-step troubleshooting article" → <b>AWS Knowledge Center (re:Post)</b></li>
<li>"Prove CloudTrail log files were not modified or deleted" → <b>log file integrity validation</b></li>
<li>"Log API activity of all current and future member accounts centrally, members can't stop it" → <b>organization trail</b></li>
<li>"Keep API records for years" → <b>trail delivering to an S3 bucket</b> (Event history covers only 90 days)</li>
<li>"Continuously evaluate and automatically fix noncompliant resources" → <b>AWS Config rules + remediation</b></li>
<li>"Email within minutes when root signs in" → <b>EventBridge + SNS</b></li>
<li>"Review and accept a BAA / agreements with AWS" → <b>AWS Artifact Agreements</b></li>
</ul></div>
`,summary:["CloudTrail records API calls: who did what, when, and from where; Event history covers 90 days, a trail stores logs long term in S3; it offers log file integrity validation and organization trails.","CloudWatch monitors performance: metrics, logs, alarms, dashboards. Use EventBridge + SNS to send instant alerts (for example when root signs in).","Config records the configuration history of resources, continuously evaluates compliance with Config rules, and can fix problems automatically (remediation).","Security logs: CloudTrail, CloudWatch Logs, VPC Flow Logs, S3 server access logs.","AWS Artifact: Reports (SOC, PCI reports, and so on) and Agreements (for example the BAA for HIPAA); compliance varies by service.","Data residency: choose a Region located in the required country; AWS does not move data out of the Region on its own.","Sources of security information: AWS Security Center, AWS Security Blog, AWS Knowledge Center."],terms:[["API call","a request sent to AWS's programming interface (every action on AWS)"],["Audit","a formal review of records to check what was done"],["AWS CloudTrail","service that records API activity"],["Amazon CloudWatch","service that monitors performance, metrics, and logs"],["Metric","a measured value tracked over time"],["Alarm","an alert triggered when a metric crosses a threshold"],["AWS Config","service that records and evaluates resource configurations"],["Config rule","a rule that evaluates whether a configuration is compliant"],["VPC Flow Logs","logs of network traffic in a VPC"],["Compliance","meeting required laws, regulations, and standards"],["AWS Artifact","portal for downloading compliance reports and accepting agreements with AWS"],["Log file integrity validation","proves CloudTrail log files were not modified or deleted"],["Organization trail","a trail that logs every account in an organization in AWS Organizations"],["AWS Audit Manager","service that collects evidence for audits"],["Data residency","a requirement about where data must be stored"],["PCI DSS","security standard for payment card data"],["HIPAA","US law protecting health information"]]};
})();
