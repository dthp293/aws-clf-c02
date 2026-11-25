(function(){var I=window.CLF_I18N=window.CLF_I18N||{};var L=I.en=I.en||{};['q','course','lessons','glossary','services','domains','ui'].forEach(function(k){L[k]=L[k]||{};});
L.course["5-1"]={title:"Lab 1: Set up a secure account and block surprise bills",goals:["Protect the root user with MFA and understand why you don't use root for everyday work","Create a separate admin identity for everyday work (IAM Identity Center or an IAM user with MFA)","Create a cost budget in AWS Budgets with an email alert at a low dollar amount","Know your way to the Billing pages and Cost Explorer so you can check costs yourself"],html:`
<h3>Before you start: why does this lab come first?</h3>
<p>From this lesson on, you will click around the <b>AWS Management Console</b> (the AWS web control panel) yourself. Learning by doing sticks far better than reading theory. But beginners have two big fears: <b>a compromised account</b> and <b>a surprise bill</b>.</p>
<p>Lab 1 deals with exactly those two fears. When you finish this lab, your account has a "double lock", you have a separate identity for everyday work, and AWS emails you as soon as costs go over the amount you set.</p>
<p>A general note for every lab: <b>the interface may look a little different</b> from the description, because AWS changes the Console quite often. Look for the feature by name, not by where the button sits.</p>

<div class="box idea"><b>🧠 In plain terms</b>
<p>The root user is like the <b>master key to the whole building</b>: it opens every door, including the one that shuts the building down for good. You don't carry the master key to the market every day. You lock it in a safe (turn on MFA, use it rarely), then cut a separate key for everyday work (an admin identity). AWS Budgets is like your bank's <b>balance alert text</b>: spend past the limit and your phone goes "ding" right away.</p>
</div>

<h3>Cost and preparation</h3>
<p><b>Cost:</b> turning on MFA, creating an IAM user, and using IAM Identity Center are all free. Viewing the Billing pages and Cost Explorer in the web interface is also free. Creating a budget and getting email alerts in AWS Budgets is <b>free</b>; only some advanced features (budgets with automated actions beyond the free allowance, scheduled budget reports) cost money. This lab creates just <b>one</b> alert budget, so the cost is 0.</p>
<p><b>About Free Tier:</b> since July 2025, AWS has changed the <b>AWS Free Tier</b> terms for new accounts: it moved to a <b>credit</b>-based model (trial credits), and when you sign up you choose one of two plans:</p>
<ul>
<li><b>Free plan</b>: no charges while you use it. The plan ends after <b>6 months</b> or when the credits run out, whichever comes first; at that point the account <b>closes automatically</b> unless you upgrade. AWS keeps your data for <b>90 days</b> and then deletes it permanently; during those 90 days you can still upgrade to the Paid plan to get access back. This plan does not let you use services/features that could burn through the credits, for example you <b>cannot buy Reserved Instances or Savings Plans</b>, or some paid AWS Marketplace products. Note: the following actions <b>automatically upgrade</b> the account to the paid plan: joining <b>AWS Organizations</b>, setting up an <b>AWS Control Tower</b> landing zone, joining the <b>AWS Partner Network</b>, signing a Professional Services contract, signing up for an Enterprise Agreement, buying an AWS Skill Builder Team subscription, or marking the account as HIPAA/SEC compliant.</li>
<li><b>Paid plan</b>: you can use every service; anything beyond the credits, or any service the credits don't cover, is <b>charged in real money</b>. On this plan, the alert budget in Part C is a must.</li>
</ul>
<p>The credit amount, time limit, and list of services can change, so <b>read the official AWS Free Tier page</b> before doing the lab. Don't trust numbers on old blogs (for example, "free for 12 months" is the rule for accounts created before July 2025).</p>
<p><b>Preparation:</b></p>
<ul>
<li>An email address you use regularly (this will be the root user's email).</li>
<li>A payment card (AWS requires one at sign-up) and a phone number for verification.</li>
<li>An authenticator app on your phone or a physical security key, to serve as <b>MFA</b> (Multi-Factor Authentication, a second proof of identity on top of your password).</li>
</ul>

<h3>Lab steps</h3>
<h4>Part A: Sign in as root and turn on MFA</h4>
<ol>
<li>If you don't have an account yet, go to the AWS sign-up page and follow the instructions. Read the plan selection step (free plan / paid plan) carefully against the current Free Tier terms.</li>
<li>Sign in to the Console with the <b>Root user</b> option, entering the account's email and password. The root user is the identity created together with the account, and it has full access.</li>
<li>Click the account name in the top corner and choose <b>Security credentials</b>.</li>
<li>Find the <b>Multi-factor authentication (MFA)</b> section and choose to assign an MFA device. Pick the device type (authenticator app, passkey/security key…), scan the QR code with your phone, and enter the codes as instructed.</li>
<li>On the same page, check the <b>Access keys</b> section: the root user <b>should not have any access keys</b>. If there is one and you don't use it, delete it.</li>
<li>Sign out and sign back in as root to make sure MFA works.</li>
</ol>

<h4>Part B: Create an admin identity for everyday work</h4>
<p>There are two routes. The <b>AWS-recommended way</b> for humans is <b>AWS IAM Identity Center</b> (formerly AWS SSO): you sign in through a dedicated access portal, get temporary credentials, and can easily extend it to many accounts later. But to use Identity Center to sign in to an <b>AWS account</b> (by assigning a permission set), you must enable it as an <b>organization instance</b>, which means enabling <b>AWS Organizations</b> (multi-account management) along with it; your account becomes the management account. Organizations is free, but if you are on the <b>Free plan</b>, enabling Organizations <b>automatically moves the account to the Paid plan</b>. (If the Console only lets you create an "account instance", that instance cannot grant access to an AWS account.)</p>
<p>The simpler way for learning is to create an <b>IAM user</b> with admin permissions and turn on MFA for that user. This uses a long-term password, so it is slightly less secure, but it is easy for beginners to understand and <b>does not touch Organizations</b>. Choose one of the two:</p>
<ol>
<li><b>Option 1 (AWS-recommended, suits the Paid plan):</b> open the <b>IAM Identity Center</b> service, click Enable, and agree to create an organization when asked. Create a user for yourself, create a <b>permission set</b> with admin permissions (for example, use the AdministratorAccess type), then assign that user + permission set to your AWS account. Open the activation email, set a password, turn on MFA, and save the <b>AWS access portal</b> link.</li>
<li><b>Option 2 (simple, the one to pick if you are on the Free plan):</b> open the <b>IAM</b> service, create a user (for example, named <code>minh-admin</code>), allow Console sign-in, and attach the <code>AdministratorAccess</code> policy. Sign in as this user through the account's IAM sign-in link, then go to the user's Security credentials to turn on MFA.</li>
<li>From now on, sign in with this admin identity. Use root only when you really need a task that only root can do.</li>
</ol>

<h4>Part C: Create a cost alert budget</h4>
<ol>
<li>Open <b>Billing and Cost Management</b>, find <b>Budgets</b>, and choose to create a budget.</li>
<li>Choose the <b>Cost budget</b> type. The Console usually offers ready-made templates such as "zero spend budget" or "monthly cost budget"; using a template or configuring it yourself both work.</li>
<li>Set a monthly period and a very low amount of your own choosing (a level you can accept while learning).</li>
<li>Add an alert threshold (for example, when actual cost goes over a percentage of the budget) and enter the email address for notifications. You can also add an alert on <b>forecasted</b> cost.</li>
<li>Save the budget and check your email (in case a confirmation is requested). Note: cost data is only updated a few times a day, so the alert email can arrive <b>a few hours late</b> compared with when the cost was incurred. A budget is a safety net; it does not replace cleaning up resources yourself right after each lab.</li>
<li>Go to <b>Billing preferences</b> and turn on Free Tier usage alerts by email if that option is available.</li>
</ol>

<h4>Part D: Look at Billing and Cost Explorer</h4>
<ol>
<li>In <b>Billing and Cost Management</b>, open the overview page (Home) and <b>Bills</b> to see the current month's bill broken down by service.</li>
<li>Open <b>Cost Explorer</b>. If this is your first time, AWS may need some time (possibly up to about a day) to prepare the data.</li>
<li>Try filtering costs by service and by month. Notice the end-of-month cost forecast.</li>
<li>If you sign in with your admin identity (IAM user or through Identity Center) and are denied on the Billing pages even with AdministratorAccess, sign in as root, go to the <b>Account</b> page, and turn on the <b>IAM user and role access to Billing information</b> option.</li>
</ol>

<div class="box example"><b>🍰 Example: BanhNgon Bakery</b>
<p>On the first day of moving to AWS, Minh simply used Lan's email to sign up and signed in as root all the time. A friend who works in security warned him: "If the root password leaks, you lose the whole shop." Minh turned on MFA for root, put the MFA phone away safely, and created a separate admin identity through IAM Identity Center.</p>
<p>Lan worries most about money. Minh created a monthly budget at a low amount and sent the alerts to both Lan's email and his own. The first time an alert email arrived, it was because Minh had forgotten to turn off a test server; the two of them dealt with it the same day, and the bill only crept up a little.</p>
</div>

<div class="box trap"><b>⚠️ Clean up and check after the lab</b>
<ul>
<li>This lab <b>needs no deletion</b>: MFA, the admin identity, and the budget are things you should keep for the long term.</li>
<li>Check that the root user <b>has no access keys</b>.</li>
<li>Check that the budget alert email goes to the address you read every day.</li>
<li>You have signed out of root and switched to the admin identity.</li>
<li>A budget <b>only alerts</b>; it does not turn off resources by itself. After you get the email, you still have to go in and clean up.</li>
</ul></div>

<div class="box exam"><b>🎯 Exam connection</b>
<ul>
<li>"Best practice for the root user" → turn on <b>MFA</b>, don't use root for everyday work, don't create access keys for root.</li>
<li>"Tasks that only the root user can perform" → for example, closing the account or changing certain account settings; the exam often lists a few options like these.</li>
<li>"Sign in once to access multiple accounts" → <b>AWS IAM Identity Center</b>.</li>
<li>"Alert when cost/usage exceeds a threshold" or "forecasted cost" → <b>AWS Budgets</b>.</li>
<li>"Visualize past costs and forecast" → <b>AWS Cost Explorer</b>.</li>
</ul></div>
`,summary:["The root user has full access: turn on MFA, don't create access keys, and use it only for tasks that only root can do.","Do everyday work with a separate admin identity; AWS recommends IAM Identity Center for humans.","AWS Budgets sends alerts when actual or forecasted cost goes over a threshold, but it does not turn off resources by itself.","Cost Explorer lets you view and filter past costs and see forecasts; the Bills page shows the bill by service.","Free Tier for new accounts (since July 2025) is credit-based, with a Free plan (no charges; the account closes automatically when it expires) and a Paid plan (you pay for anything beyond the credits): always read the official page.","For Identity Center to grant access to an AWS account it needs AWS Organizations; on the Free plan, enabling Organizations automatically moves you to the Paid plan."],terms:[["Root user","the all-powerful identity created together with the account"],["MFA (Multi-Factor Authentication)","signing in with a second proof of identity besides the password"],["Access key","a credential used for programmatic/CLI access"],["AWS IAM Identity Center","a single sign-on service for multiple accounts (formerly AWS SSO)"],["Permission set","a bundle of permissions in IAM Identity Center"],["AWS access portal","the sign-in portal of IAM Identity Center"],["AWS Budgets","a service for setting budgets and cost alerts"],["Cost budget","a budget based on dollar cost"],["Forecasted cost","the cost predicted for the period"],["AWS Cost Explorer","a tool for viewing and analyzing costs"],["AWS Free Tier","AWS's free usage offer"],["Credit","trial money applied to your bill"]]};
L.course["5-2"]={title:"Lab 2: IAM users, groups, policies, and least privilege",goals:["Create an IAM group and attach a read-only AWS managed policy","Create an IAM user, add it to the group, and try signing in as that user","Verify least privilege for yourself: see clearly what the user can do and what gets denied","Clean up the user and group when you are done"],html:`
<h3>Quick review: user, group, policy</h3>
<p><b>IAM</b> (Identity and Access Management) answers two questions: <b>who are you</b> and <b>what are you allowed to do</b>.</p>
<ul>
<li><b>IAM user</b>: a named identity that can sign in to the Console with a password or call the API with an access key.</li>
<li><b>IAM group</b>: a collection of users. Attach permissions to the group and every user in it gets them.</li>
<li><b>Policy</b>: a JSON document that lists which actions are allowed (Allow) or forbidden (Deny) on which resources. An <b>AWS managed policy</b> is a policy that AWS has written for you and keeps up to date.</li>
</ul>
<p>The golden rule is <b>least privilege</b>: grant exactly the permissions needed to do the job, and no more. By default, a new user has <b>no permissions at all</b>; everything is denied until a policy allows it.</p>

<div class="box idea"><b>🧠 In plain terms</b>
<p>Think of office access cards. A new employee gets a blank card that opens no doors. HR assigns the card to the "Accounting" group, and now it opens the accounting room and the meeting room, but not the server room. Because access is assigned by group, when 20 new accountants join you just add them to the group instead of programming each card.</p>
</div>

<h3>Cost and preparation</h3>
<p><b>Cost:</b> IAM is free. Creating users, groups, and policies costs nothing. This lab creates no billable resources, so the cost is 0 if you follow the steps.</p>
<p><b>Preparation:</b></p>
<ul>
<li>You have done Lab 1: root has MFA, and you are signed in with your admin identity.</li>
<li>A private/incognito browser window, so you can sign in as the new user without signing out of the admin account.</li>
</ul>
<p>Note: for real human users, AWS recommends <b>IAM Identity Center</b>. This lab uses an IAM user so you can see with your own eyes how users, groups, and policies work, because the exam asks about them a lot. The Console may suggest switching to Identity Center when you create a user; in this lab, just choose to create an IAM user.</p>

<h3>Lab steps</h3>
<p><b>The interface may look a little different</b>; look for the feature by name.</p>
<h4>Part A: Create a group with read-only permissions</h4>
<ol>
<li>Open the <b>IAM</b> service, choose <b>User groups</b>, and click to create a group.</li>
<li>Give it a name, for example <code>lab-s3-readonly</code>.</li>
<li>In the attach-policy section, search for and select the AWS managed policy <code>AmazonS3ReadOnlyAccess</code> (read-only access to S3). Create the group.</li>
<li>Open the policy you just selected and look at the JSON tab. You will see actions starting with <code>s3:Get</code> and <code>s3:List</code> with the effect <code>Allow</code>: view only, no changes.</li>
</ol>

<h4>Part B: Create a user and add it to the group</h4>
<ol>
<li>In IAM, choose <b>Users</b>, click to create a user, and name it, for example, <code>lab-viewer</code>.</li>
<li>Turn on Console access and set a temporary password (you can require a password change at first sign-in).</li>
<li>At the permissions step, choose to <b>add the user to a group</b> and select <code>lab-s3-readonly</code>. Do not attach policies directly to the user.</li>
<li>Create the user. Write down the Console sign-in link for IAM users (it contains the account ID or the account alias).</li>
</ol>

<h4>Part C: Test the permissions</h4>
<ol>
<li>Open the incognito window, go to the IAM sign-in link, and sign in as <code>lab-viewer</code>.</li>
<li>Open <b>S3</b>: you can see the list of buckets (if the account has any).</li>
<li>Try to <b>create a bucket</b>: it fails with a message like "Access Denied" because the policy has no create permission.</li>
<li>Open <b>EC2</b>: you will see many "not authorized" messages because the group only has S3 permissions.</li>
<li>Go back to the admin window, open the user <code>lab-viewer</code>, and look at the permissions tab: the S3 permissions come from the group, not from a direct attachment. That is the tidy way to manage access. (If you turned on "change password at first sign-in", the Console also attaches the <code>IAMUserChangePassword</code> policy directly to the user so they can change their own password; that is normal.)</li>
<li>(Optional) Try removing the user from the group and signing in again as the user: now S3 is denied too, because the default is to deny everything.</li>
</ol>

<div class="box example"><b>🍰 Example: BanhNgon Bakery</b>
<p>BanhNgon hires Ha as an accountant. Ha needs to view the sales reports stored in S3 but must never delete or edit them. Minh creates an "accounting" group with a read-only S3 policy and adds Ha to the group.</p>
<p>One day Ha accidentally clicks the delete button on a report file. AWS refuses right away because Ha has no delete permission. Lan breathes a sigh of relief: least privilege just saved an important file.</p>
</div>

<h3>Why attach permissions to a group instead of to each user?</h3>
<p>If you attach policies directly to each person, then with 20 people in the same role you have to repeat it 20 times, and it is very easy to miss something or give too much. Attach to a group and you only edit one place. When someone changes departments, just move them to another group.</p>
<p>Also remember the permission evaluation rule: the default is <b>implicit deny</b> (denied unless something allows it); an Allow permits the action; but if there is an <b>explicit Deny</b> (a policy that says Deny) anywhere, Deny always wins.</p>

<div class="box trap"><b>⚠️ Clean up after the lab</b>
<ul>
<li>Sign out of <code>lab-viewer</code> and close the incognito window.</li>
<li>Delete the user <code>lab-viewer</code> (the Console also deletes the password and removes the user from the group).</li>
<li>Delete the group <code>lab-s3-readonly</code>.</li>
<li>Do not delete the AWS managed policy (you can't, and you don't need to).</li>
<li>Check the Users list again: no test user is left behind with a forgotten password or access key.</li>
</ul></div>

<div class="box exam"><b>🎯 Exam connection</b>
<ul>
<li>"Grant only the permissions required" → <b>principle of least privilege</b>.</li>
<li>"Most efficient way to give the same permissions to many users" → add the users to an <b>IAM group</b> with the right policy.</li>
<li>"Application on EC2 needs to access S3" → use an <b>IAM role</b>; don't put access keys in the code.</li>
<li>"Enforce password length/rotation" → <b>IAM password policy</b>.</li>
<li>"Report of all users and credential status" → <b>IAM credential report</b>.</li>
</ul></div>
`,summary:["IAM answers 'who are you' (user, group, role) and 'what are you allowed to do' (policy).","A new user has no permissions by default; an explicit Deny always beats an Allow.","Attaching policies to groups instead of individual users keeps management tidy and reduces mistakes.","AWS managed policies are written by AWS, such as AmazonS3ReadOnlyAccess for read-only access to S3.","Least privilege: grant only the permissions needed, and verify it by trying an action that should be denied.","IAM is free, but you should still delete test users so no forgotten passwords are left behind."],terms:[["IAM (Identity and Access Management)","the service that manages identities and access permissions"],["IAM user","a named identity with long-term credentials"],["IAM group","a collection of IAM users that share permissions"],["IAM role","an identity with temporary permissions that can be assumed"],["Policy","a JSON document that defines permissions"],["AWS managed policy","a policy written and maintained by AWS"],["Least privilege","granting only the permissions needed"],["Implicit deny","the default: denied unless allowed"],["Explicit deny","a stated Deny, which always beats Allow"],["Access Denied","the error shown when you lack permission"],["Password policy","rules for password strength and rotation"],["Credential report","a report on all users' credentials"]]};
L.course["5-3"]={title:"Lab 3: A static website on Amazon S3",goals:["Create an S3 bucket and upload an index.html page","Turn on static website hosting and understand the step that opens public access (Block Public Access, bucket policy)","Understand why making a bucket public is risky, and why CloudFront is the standard approach in production","Delete the objects and the bucket so no charges build up"],html:`
<h3>What is a static website?</h3>
<p>A <b>static website</b> consists only of ready-made files: HTML, CSS, images, and JavaScript that runs in the browser. The server does not need to "compute" anything; it just sends files to the visitor. An about page, a cake menu, and a contact page are typical examples.</p>
<p><b>Amazon S3</b> (Simple Storage Service, an object storage service) stores files in <b>buckets</b> (containers). Each file is an <b>object</b>. S3 has a <b>static website hosting</b> feature that serves those files as a website, with no server needed.</p>

<div class="box idea"><b>🧠 In plain terms</b>
<p>An S3 bucket is like a <b>glass display case</b>. By default the case is locked, and only the shop owner can open it. If you want passersby to see the cakes, you have to open the case for everyone. Opening it is convenient, but if you accidentally left private papers inside, everyone sees those too. So only put in the case what you really want to be public.</p>
</div>

<h3>Cost and preparation</h3>
<p><b>Cost:</b> S3 charges for storage used, number of requests, and data transferred out to the internet. An HTML file of a few KB, viewed a few times, costs practically 0 and may fall within your account's free offer. To keep it near 0: upload only small files, don't share the link widely, and <b>delete the bucket as soon as you finish</b>.</p>
<p><b>Preparation:</b></p>
<ul>
<li>You have done Lab 1 (you have an alert budget) and are signed in with your admin identity.</li>
<li>A simple <code>index.html</code> file on your computer, for example with just one line: <code>&lt;h1&gt;Hello from BanhNgon&lt;/h1&gt;</code>.</li>
</ul>

<h3>Lab steps</h3>
<p><b>The interface may look a little different</b>; look for the feature by name.</p>
<ol>
<li>Open <b>S3</b> and click to create a bucket. Choose a Region near you (for example, Singapore): in the Region selector at the top right, or right in the create-bucket form. Give the bucket a <b>globally unique</b> name, using only lowercase letters, numbers, and hyphens, for example <code>banhngon-lab-yourname-123</code>.</li>
<li>Notice the <b>Block Public Access</b> section: it is <b>on</b> by default for new buckets. Leave it as is for now and create the bucket.</li>
<li>Open the bucket, choose <b>Upload</b>, and upload the <code>index.html</code> file.</li>
<li>Go to the bucket's <b>Properties</b> tab, scroll down to <b>Static website hosting</b>, choose Enable, select the "Host a static website" option, and enter <code>index.html</code> as the index document. Save.</li>
<li>In that same section, copy the <b>Bucket website endpoint</b> link. Try opening it in a browser: you will get a <b>403 Forbidden</b> error. That is exactly what we expect, because the bucket is still locked.</li>
<li>Go to the <b>Permissions</b> tab and edit <b>Block Public Access</b> for this bucket: clear <b>Block all public access</b> to allow a public bucket policy. The Console will warn you and make you confirm. Read the warning carefully. Turn it off only at the level of <b>this bucket</b>; if the Console still shows an error when you save the public policy in the next step, the account may have Block Public Access turned on at the <b>account level</b> (the "Block Public Access settings for this account" item in the S3 menu). In that case it is best to stop the lab at step 5 rather than open up the whole account.</li>
<li>Still on the Permissions tab, edit the <b>Bucket policy</b> to allow everyone (<code>"Principal": "*"</code>) to perform <b>only</b> the <code>s3:GetObject</code> action (read a file) on <code>arn:aws:s3:::BUCKET-NAME/*</code>. Replace BUCKET-NAME with your bucket's name. The Console has a policy generator and examples you can refer to.</li>
<li>Open the website endpoint again: the "Hello from BanhNgon" page appears. Notice that this endpoint is <b>HTTP</b> only, with no HTTPS.</li>
</ol>

<h3>Why is making a bucket public risky?</h3>
<p>A great many data leaks around the world started with an S3 bucket accidentally left public, holding customer files, backups, or passwords. That is why AWS turns on Block Public Access by default and warns you several times when you turn it off.</p>
<p>In this lab the risk is small because the bucket holds only one harmless HTML file. But the general rule is: <b>never</b> keep private data together with public content, and grant only read permission (GetObject), never write or delete.</p>
<p>In production, the standard approach is to keep the bucket <b>private</b> and put <b>Amazon CloudFront</b> (a content delivery network, or CDN) in front of it. CloudFront is allowed to read the bucket through <b>Origin Access Control</b> (OAC), while users reach it only through CloudFront. You also get HTTPS (using a certificate from AWS Certificate Manager), content is cached at an <b>edge location</b> near the customer so it loads faster, and you can add AWS WAF.</p>
<div class="flow"><span>Customer</span><span>CloudFront (HTTPS, edge)</span><span>Private S3 bucket</span></div>

<div class="box example"><b>🍰 Example: BanhNgon Bakery</b>
<p>Minh wants to get the mooncake menu page online fast. He creates a bucket, uploads the HTML page and cake photos, and turns on static website hosting. It takes just ten minutes, with no server at all.</p>
<p>When customers in Japan start visiting too, Minh switches to CloudFront: the bucket is locked again, the site runs on HTTPS, and the cake photos load faster from an edge location near Tokyo. The bucket holding order backups is kept separate, and Minh never makes it public.</p>
</div>

<div class="box trap"><b>⚠️ Clean up after the lab</b>
<ul>
<li>Open the bucket, select all objects, and <b>delete</b> them (or use the <b>Empty</b> bucket function). A bucket must be empty before it can be deleted.</li>
<li>If you turned on Versioning, remember to delete the old versions too (Empty bucket takes care of that).</li>
<li><b>Delete the bucket</b> (the Console makes you type the bucket name to confirm).</li>
<li>Check the bucket list (the S3 Console lists buckets from every Region on one page): no test bucket remains. Open the website endpoint again: it should now return an error and no longer show the page.</li>
<li>If you turned off Block Public Access at the <b>account level</b> (not recommended), turn it back on.</li>
<li>If you tried creating a CloudFront distribution, you must disable and then delete it separately.</li>
</ul></div>

<div class="box exam"><b>🎯 Exam connection</b>
<ul>
<li>"Host a static website without servers" → <b>Amazon S3 static website hosting</b>.</li>
<li>"Cache static content at edge locations, reduce latency globally" → <b>Amazon CloudFront</b> (uses <b>edge locations</b>).</li>
<li>"Factors that affect S3 cost" → storage used, number of requests, <b>data transfer out</b> to the internet.</li>
<li>"Encrypt data in transit for a website" → HTTPS/TLS, with a certificate from <b>AWS Certificate Manager</b>.</li>
<li>Bucket policies and Block Public Access are part of the <b>customer's</b> responsibility in the shared responsibility model.</li>
</ul></div>
`,summary:["S3 static website hosting serves HTML/CSS/image files without any server.","New buckets have Block Public Access on by default; public access returns a 403 error until you open it.","Making it public requires turning off Block Public Access and adding a bucket policy that allows only s3:GetObject.","Public buckets are a common cause of data leaks: never keep private data together with public content.","The standard approach in production: private bucket + CloudFront (OAC, HTTPS, caching at the edge).","Cleanup: empty the bucket, then delete the bucket."],terms:[["Static website","a website made only of ready-made files"],["Bucket","a container for objects in S3"],["Object","a file stored in S3"],["Static website hosting","storing and serving a static website"],["Block Public Access","settings that block public access to buckets"],["Bucket policy","a permissions policy attached to a bucket"],["Website endpoint","the bucket's website address"],["403 Forbidden","the error for access that is not allowed"],["CDN (Content Delivery Network)","a network that delivers content from locations near users"],["Origin Access Control (OAC)","the mechanism that lets CloudFront read a private bucket"],["Edge location","a site where CloudFront caches content near users"],["Data transfer out","data sent out of AWS"]]};
L.course["5-4"]={title:"Lab 4: Run an EC2 server and clean up",goals:["Launch a small EC2 instance, preferring a type labeled as free-tier eligible if the Console shows one","Tell a key pair apart from EC2 Instance Connect, and configure a security group that opens only the port you need","Connect to the server and look at basic metrics in CloudWatch","Terminate the instance and check that no EBS volume or Elastic IP is left behind"],html:`
<h3>What is EC2? A very short recap</h3>
<p><b>Amazon EC2</b> (Elastic Compute Cloud) lets you rent <b>virtual servers</b>, called <b>instances</b>. You choose the operating system through an <b>AMI</b> (Amazon Machine Image, a template image of the machine), choose the hardware through the <b>instance type</b> (for example, how much CPU and RAM), and start it up in a few minutes. The machine's disk is an <b>EBS volume</b> (a block storage disk attached over the network).</p>
<p>This is the lab most likely to cost you money if you forget to clean up, because a running server is billed continuously by time. Read the cleanup section carefully before you start.</p>

<div class="box idea"><b>🧠 In plain terms</b>
<p>Renting EC2 is like <b>renting a hotel room</b>. You pay for as long as you stay. <b>Stop</b> is like stepping out for a while but keeping the room and your belongings: you no longer pay for the "bed" but you still pay to store your things (the EBS disk). <b>Terminate</b> is like checking out for good: the hotel clears everything, and you pay nothing more. A <b>security group</b> is the guard at the room door, who lets in only the people on the list.</p>
</div>

<h3>Cost and preparation</h3>
<p><b>Cost:</b> EC2 charges for the time the instance runs (depending on the instance type), plus EBS storage, plus the <b>public IPv4 address</b> (AWS currently charges by the hour for public IPv4; an Elastic IP not attached to a running machine is charged too). Some small instance types are labeled something like "Free tier eligible" in the Console and may be free or paid from credits, depending on your account's terms. According to the EC2 documentation: accounts created on or after <b>July 15, 2025</b> can use <b>t3.micro, t3.small, t4g.micro, t4g.small, c7i-flex.large, m7i-flex.large</b>; accounts created before that use <b>t2.micro or t3.micro</b> (depending on the Region). The list can change, so <b>trust the "Free tier eligible" label shown in your own Console</b>. To keep it near 0: pick the smallest instance with the free-tier label, use the default disk, run it for a short time, and <b>terminate it as soon as you finish</b>.</p>
<p><b>Preparation:</b></p>
<ul>
<li>You already have the alert budget from Lab 1.</li>
<li>Sign in with your admin identity, choose a Region near you, and <b>remember that Region</b> (EC2 only shows resources in the currently selected Region).</li>
</ul>

<h3>Key pair or EC2 Instance Connect?</h3>
<p>To log in to a Linux machine, people usually use <b>SSH</b> (a protocol for controlling a machine remotely, port 22).</p>
<ul>
<li><b>Key pair</b>: AWS keeps the public key, and you download the private key file. Lose the file and you can't get in this way; leak the file and someone else can get in.</li>
<li><b>EC2 Instance Connect</b>: an SSH connection right in the browser from the Console. AWS pushes a short-lived temporary key, so you don't have to keep a key file. Amazon Linux comes with the required component. Note: a browser-based connection comes from the IP range of the Instance Connect service in the Region, so the security group must allow port 22 from that range. AWS provides a <b>managed prefix list</b> (a list of IP ranges maintained by AWS) named like <code>com.amazonaws.REGION-NAME.ec2-instance-connect</code>, for example <code>com.amazonaws.ap-southeast-1.ec2-instance-connect</code> for Singapore. This type of connection also requires the instance to have a <b>public IPv4</b> address (charged by the hour, see the cost section).</li>
</ul>
<p>There is also <b>AWS Systems Manager Session Manager</b>, which connects without opening the SSH port but needs an IAM role configured for the machine; you can explore it later.</p>

<h3>Lab steps</h3>
<p><b>The interface may look a little different</b>; look for the feature by name.</p>
<ol>
<li>Open <b>EC2</b> and choose <b>Launch instance</b>. Give it a name, for example <code>banhngon-lab</code>.</li>
<li>Choose the <b>Amazon Linux</b> AMI (the latest version the Console suggests).</li>
<li>Choose a small instance type with the free-tier label if the Console shows one. If you see no label, choose the smallest type and remember to shut it down soon.</li>
<li>In the key pair section: choose to create a new key pair and download the file (to keep a fallback), or choose to proceed without a key pair if you will only use Instance Connect.</li>
<li>In network settings, leave the default VPC/subnet and keep <b>Auto-assign public IP</b> enabled (needed for the connection step). Create a new <b>security group</b>. Keep only <b>one inbound SSH rule on port 22</b>. The wizard usually pre-fills the source <b>Anywhere</b> (<code>0.0.0.0/0</code>, anywhere on the internet): <b>change it</b>. Because step 8 uses EC2 Instance Connect in the browser, choose the source <b>Custom</b> and then select the Region's <code>ec2-instance-connect</code> prefix list. (If you SSH from your own computer with a key pair, choose "My IP"; note that "My IP" will <b>not</b> allow a browser-based Instance Connect connection.) Do <b>not</b> open any other ports. If the prefix list is hard to select in the wizard, you can edit the rule in the security group after Launch.</li>
<li>Keep the default disk, and notice that the root volume's <b>Delete on termination</b> option is on. Click Launch.</li>
<li>Wait for the state to change to <b>Running</b> and the status checks to pass.</li>
<li>Select the instance, click <b>Connect</b>, choose the <b>EC2 Instance Connect</b> tab, and connect. A command-line window appears. Try typing <code>whoami</code> and <code>uptime</code>.</li>
<li>Exit, go back to the instance, and open the <b>Monitoring</b> tab: look at the CPU and network charts. These are <b>Amazon CloudWatch</b> metrics. The default is basic monitoring, with data at 5-minute intervals; RAM is not included and requires installing an agent.</li>
</ol>

<div class="box example"><b>🍰 Example: BanhNgon Bakery</b>
<p>Minh tries setting up an EC2 server to run a test version of the cake ordering page. The first time, he opens the security group to "anywhere" on every port to save time. A few hours later the logs are full of password-guessing attempts from all over the world.</p>
<p>Minh fixes it: only port 22 is open, and only to the IP range needed. That evening, he forgets to terminate the machine. The alert email from AWS Budgets (Lab 1) reminds him the next morning. Since then, Minh always goes through the cleanup checklist as soon as he finishes testing.</p>
</div>

<div class="box trap"><b>⚠️ Clean up after the lab (the most important cleanup of all the labs)</b>
<ul>
<li>Select the instance and choose <b>Instance state → Terminate</b> (not Stop). Stop still charges for the EBS disk (and the Elastic IP, if any).</li>
<li>Wait for the state to change to <b>Terminated</b> (the instance may stay in the list for a while and then disappear by itself).</li>
<li>Open <b>Elastic Block Store → Volumes</b>: no volume from the lab remains in the "available" state. If one does, delete it.</li>
<li>Open <b>Snapshots</b>: delete any snapshot you created.</li>
<li>Open <b>Elastic IPs</b>: if you allocated one, <b>release</b> it. An unused Elastic IP is still charged.</li>
<li>Delete the <code>launch-wizard</code> security group and the lab's key pair if you no longer need them (they are free, but tidy is better).</li>
<li>Double-check that you are in the <b>Region</b> you used; if you are not sure, look at the Bills page or use EC2 Global View to find it.</li>
</ul></div>

<div class="box exam"><b>🎯 Exam connection</b>
<ul>
<li>"Example of IaaS" → <b>Amazon EC2</b>: you manage the operating system, patches, and configuration.</li>
<li>"Security groups" → <b>stateful</b>, work at the <b>instance</b> level, and have allow rules only. Configuring them is the <b>customer's</b> responsibility.</li>
<li>"Block storage for EC2" → <b>Amazon EBS</b>; "temporary storage attached to the host" → <b>instance store</b>.</li>
<li>"Alarm when CPU stays high" → <b>Amazon CloudWatch</b>.</li>
<li>"Instances use under 10% CPU, change to smaller type" → <b>rightsizing</b>; cost optimization recommendations → <b>Trusted Advisor</b>, <b>Compute Optimizer</b>.</li>
</ul></div>
`,summary:["EC2 = virtual servers: choose an AMI, an instance type, an EBS disk, and a security group.","A key pair is a private key file you keep yourself; EC2 Instance Connect uses a temporary key through the browser.","A security group is a stateful firewall at the instance level: open only the port and source you need.","CloudWatch shows the instance's CPU and network metrics; basic monitoring uses 5-minute intervals.","Terminate (not Stop) to stop the charges; then check EBS volumes, snapshots, and Elastic IPs.","Public IPv4 addresses and unused Elastic IPs can both incur charges."],terms:[["Instance","an EC2 virtual server"],["AMI (Amazon Machine Image)","a template image with the operating system used to create a machine"],["Instance type","the hardware configuration of a machine (CPU, RAM)"],["EBS volume","a block storage disk attached to EC2"],["Key pair","a public/private key pair used to log in"],["SSH (Secure Shell)","a secure protocol for controlling a machine remotely"],["EC2 Instance Connect","an SSH connection with a temporary key through the Console"],["Security group","a virtual firewall at the instance level"],["Inbound rule","a rule for incoming traffic"],["Elastic IP","a fixed public IPv4 address"],["Stop / Terminate","pause the instance / delete it for good"],["Delete on termination","automatically delete the disk when the instance is terminated"],["Metric","a measured value tracked over time"]]};
L.course["5-5"]={title:"Lab 5: Your first Lambda function and reading logs",goals:["Create a 'hello world' AWS Lambda function in Python or Node.js right in the Console","Run the function with a test event and read the logs in CloudWatch Logs","See that CloudTrail Event history has recorded the API calls you just made","Delete the function and the log group when you are done"],html:`
<h3>Serverless and Lambda, in simple words</h3>
<p>In Lab 4, you had to pick a machine, open a port, and remember to shut it down. With <b>AWS Lambda</b>, you just write a piece of code called a <b>function</b>. AWS takes care of all the server work: it runs the code when an event happens, scales automatically when requests pile up, and you pay by the <b>number of invocations</b> and the <b>run time</b>. If nobody calls it, it costs practically nothing. That is what <b>serverless</b> means (there are still servers, but you don't have to manage them).</p>
<p>Each run of a Lambda function is limited to a maximum of 15 minutes. Jobs that run longer than that need a different service.</p>

<div class="box idea"><b>🧠 In plain terms</b>
<p>EC2 is like <b>keeping a full-time chef on staff</b>: you pay the salary whether or not there are customers. Lambda is like <b>calling in a chef per order</b>: when an order comes in, the chef arrives and cooks, then leaves, and you pay by the number of dishes and the cooking time. CloudWatch Logs is the <b>kitchen logbook</b>; CloudTrail is the <b>camera at the office door</b> that records who gave the order to hire or fire the chef.</p>
</div>

<h3>Cost and preparation</h3>
<p><b>Cost:</b> Lambda charges by the number of requests and the run time (based on the configured memory size). Lambda has a monthly free usage allowance; a few test runs cost practically nothing. <b>CloudWatch Logs</b> charges for the amount of log data ingested and stored, but a few log lines are tiny. <b>CloudTrail Event history</b> is on by default and free to view. To keep it near 0: run only a few tests, don't attach a public trigger, and delete the function and its log group when you finish.</p>
<p><b>Preparation:</b> you have done Lab 1, you are signed in with your admin identity, and you have chosen a Region and remember which one.</p>

<h3>Lab steps</h3>
<p><b>The interface may look a little different</b>; look for the feature by name.</p>
<h4>Part A: Create and test the function</h4>
<ol>
<li>Open <b>Lambda</b>, click to create a function, and choose <b>Author from scratch</b>.</li>
<li>Give it a name, for example <code>banhngon-hello</code>. Choose the <b>Python</b> runtime (the latest 3.x version) or <b>Node.js</b>.</li>
<li>In the permissions section, leave the default: Lambda will create an <b>execution role</b> (an IAM role for the function) with basic permissions to write logs to CloudWatch. Create the function.</li>
<li>In the code editor, edit the sample function to print one log line and return a greeting. In Python, the function looks like <code>def lambda_handler(event, context):</code>, with <code>print("Hello from BanhNgon")</code> inside, and returns a dict whose <code>statusCode</code> is 200. Click <b>Deploy</b> to save.</li>
<li>Choose <b>Test</b>, create a test event (you can leave the sample JSON), name it, and run it.</li>
<li>Look at the result: the response section is the value the function returned; the log section has the line you printed, along with a REPORT line showing the run time and the memory used. This run time is exactly what the bill is based on.</li>
</ol>

<h4>Part B: Read the logs in CloudWatch Logs</h4>
<ol>
<li>On the function page, open the <b>Monitor</b> tab and choose to view the logs in CloudWatch (or go straight to <b>CloudWatch → Logs → Log groups</b>).</li>
<li>Find the <b>log group</b> named like <code>/aws/lambda/banhngon-hello</code>. Inside are <b>log streams</b>, each holding the logs of some runs.</li>
<li>Open the newest stream and find the line "Hello from BanhNgon". Run the test once more and refresh to see the new log appear.</li>
</ol>

<h4>Part C: Look at CloudTrail Event history</h4>
<ol>
<li>Open <b>CloudTrail</b> and choose <b>Event history</b>. It keeps management events from the last 90 days with no setup needed.</li>
<li>Make sure you are in the <b>same Region</b> where you created the function. In the filter box, choose <b>Event source</b> and enter <code>lambda.amazonaws.com</code> (or choose <b>Resource name</b> and enter <code>banhngon-hello</code>). The filter needs the <b>exact full value</b>; the real name of the create-function event includes a version suffix, like <code>CreateFunction20150331</code>, so filtering by event source is easier. It can take a few minutes for events to show up.</li>
<li>Open the event: you see <b>who</b> made the call (your admin identity), <b>when</b>, <b>from which IP</b>, and which API was called. To see the event that created the function's IAM role (<code>CreateRole</code>), switch the Region to <b>US East (N. Virginia)</b>: IAM is a global service, so its events are recorded in that Region.</li>
<li>Notice: <b>running the function</b> (Invoke) is a <b>data event</b>, which is not in Event history by default. Event history mainly records management operations such as creating, changing, and deleting resources.</li>
</ol>

<div class="box example"><b>🍰 Example: BanhNgon Bakery</b>
<p>Minh writes a Lambda function that sends a thank-you note every time a new cake order comes in. One day the function throws an error; Minh opens CloudWatch Logs, reads the error line, and fixes it in five minutes.</p>
<p>The next week, the function suddenly disappears. Minh opens CloudTrail Event history, filters for the DeleteFunction event, and sees that it was the intern's account that deleted it by mistake. Nobody has to guess: CloudTrail answers the question "who did what, and when".</p>
</div>

<div class="box trap"><b>⚠️ Clean up after the lab</b>
<ul>
<li>In Lambda, select the function <code>banhngon-hello</code> and <b>delete</b> it.</li>
<li>Deleting the function does <b>not</b> delete its logs. Go to <b>CloudWatch → Log groups</b> and delete the log group <code>/aws/lambda/banhngon-hello</code>.</li>
<li>Go to <b>IAM → Roles</b> and delete the execution role that Lambda created for this function (its name usually starts with the function name, like <code>banhngon-hello-role-...</code>). If <b>IAM → Policies</b> (filter by "Customer managed") shows a policy named like <code>AWSLambdaBasicExecutionRole-...</code> that was created at the same time, delete it too; you cannot delete (and don't need to delete) AWS managed policies.</li>
<li>If you added a trigger (API Gateway, S3, EventBridge…), delete those resources as well.</li>
<li>There is no need to delete CloudTrail Event history: it is on by default, free, and your own delete events will be recorded there too.</li>
</ul></div>

<div class="box exam"><b>🎯 Exam connection</b>
<ul>
<li>"Run code without provisioning servers, pay only for compute time" → <b>AWS Lambda</b>.</li>
<li>"Job runs about 3 hours continuously" → do <b>not</b> use Lambda (15 minutes maximum).</li>
<li>"Which services are serverless" → Lambda, DynamoDB, Fargate…</li>
<li>With Lambda, the customer is responsible for the function's <b>code and IAM permissions</b>; AWS handles the infrastructure and the operating system.</li>
<li>"Who did what, when (API calls), who deleted a resource" → <b>AWS CloudTrail</b>. "Metrics, logs, alarms" → <b>Amazon CloudWatch</b>.</li>
</ul></div>
`,summary:["Lambda runs code in response to events with no servers to manage, billed by number of requests and run time; 15 minutes maximum per run.","The execution role is the function's IAM role; the default permissions are enough to write logs to CloudWatch Logs.","The function's logs live in the log group /aws/lambda/ + function name, split into log streams.","CloudTrail Event history records 90 days of management events and is on by default: who called which API, when, and from where.","CloudWatch = metrics, logs, alarms (how the system is running); CloudTrail = API call history (who did what).","Cleanup: delete the function, delete the log group (it does not go away by itself), delete the execution role."],terms:[["Serverless","running code without managing servers yourself"],["Function","the unit of code that runs on Lambda"],["Runtime","the language environment that runs the code (Python, Node.js…)"],["Handler","the function Lambda calls when it runs"],["Test event","a sample event used to test the function"],["Execution role","the IAM role that grants permissions to a Lambda function"],["Trigger","an event source that invokes the function"],["Log group","a group of logs in CloudWatch Logs"],["Log stream","a sequence of log entries within a log group"],["Event history","CloudTrail's 90-day record of events"],["Management event","an event for managing resources (create, change, delete)"],["Data event","an event on the data itself (for example, invoking a function or reading an object)"]]};
})();
