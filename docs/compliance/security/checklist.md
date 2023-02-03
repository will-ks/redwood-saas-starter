# The SaaS CTO Security Checklist

Source: https://s3-eu-west-1.amazonaws.com/sqreen-assets/whitepapers/SaaS+CTO+Security+Checklist.pdf

This is a basic checklist that all SaaS CTOs
(and anyone else) can use to harden their
security. Security shouldn’t feel like a
chore. Implement the rules adapted to your
company stage to improve your security.
This list is far from exhaustive, incomplete
by nature since the security you need
depends on your assets

## Seed

- [ ] Ensure your domain names are secured. Domain names should be renewed regularly. If you have bought one from a third party you should also make sure that the
      authoritative configured name server is your own.
- [ ] Be honest and transparent about any data you collect. In the case of a breach, people will disclose any data they gather. Your customers need to be aware of what data you're storing.
- [ ] Make sure all your critical services are secured. Many companies rely on Google Apps, Slack, Wordpress… These services all have defaults that should be improved to increase the security level. All these services should be updated on a regular basis when relevant.
- [ ] Do not share Wifi. Sharing Wifi networks with guests or neighbors may give them the opportunity to gather information on your network, and allow them to access resources protected by source IP. Use an isolated and dedicated guest Wifi network. Set up a calendar reminder to change the password every two months, since this password is shared.
- [ ] Accustom everyone to security practices.
      Humans are often the weakest links in the chain of security. By explaining how an attacker could infiltrate your company, you
      will increase their awareness and thus minimize the chance of them falling for such a trap
- [ ] Require 2FA in your services.
      Your employees should all use 2-factor authentication. It means that if their password gets stolen, the attacker cannot use it
      without the second factor. As a CTO your role is to make sure everyone complies with this rule.
- [ ] Encrypt all employee laptops & phones.
      By encrypting all laptops, you protect both your company’s assets, and your employee’s private files.
- [ ] Accustom your team to locking their machines while away.
      Your office may be secured, but you will eventually have to receive external people for a party or a meeting. Locking all the
      machines is a great habit. If you get in the habit of locking your machine at the officece, you’ll be unlikely to forget to also do
      it in a Starbucks or at a meetup
- [ ] Use a password manager to ensure you only use strong passwords.
      Using a complex and unique password for every website is great advice, but it can be very difficult to remember all of them.
      Password managers are a great way to manage these, since they will remember everything for you with a master password.
- [ ] Follow an onboarding / offboarding checklist.
      This checklist should contain a list of all the steps you need to enforce when an employee, contractor, intern, etc… joins your
      company. A similar list can also be used when the someone is leaving your team.
- [ ] Use SSL certificates to secure people using your website.
      Encrypting communications is not only about privacy, but also about your users’ safety, since it will prevent most attempts at
      tempering with what they receive
- [ ] Check your website's basic security.
      Websites are vulnerable to many different classes of vulnerabilities, some may be prevented by the appropriate configuration
      on the server. Such headers include HSTS, X-Frame-Options, X-Content-Type-Options, etc… some of which will be very
      valuable for your user’s protection. Static websites may expose your users to less risks.
- [ ] Isolate assets at the network level.
      Only your public APIs should be exposed to the Internet. You should isolate your networks to prevent any unauthorized
      accesses to your database. This will prevent attackers from connecting to it and attempting to crack the password - or exploit
      vulnerabilities.
- [ ] Keep your OS up to date.
      You should download all of your OS's security updates and regularly update your machines. For servers, you can delegate it to
      a PAAS provider (Heroku, AWS Beanstalk, etc…)
- [ ] Backup.
      Backup all your critical assets. Ensure that you attempt to restore your backups frequently so you can guarantee that they're
      working as intended.
- [ ] Enforce a secure code review checklist.
      Security should always be kept in mind while coding. Pull requests should be performed with security in mind as well.
      Depending on where the code is, the checks should be different. Dealing with user entry is one thing, dealing with business
      structures is another: the concerns are related to the context. In addition to common sense, keep in mind the typical security
      flaws. Security is also a good topic to ask about when interviewing a candidate.
- [ ] Use a Static Security Code Analysis tools.
      Static code analysis tools can quickly overwhelm you with a lot of meaningless false-positives. But switching on
      security-focused tools can help you discover vulnerabilities inside your code and most importantly increase the security
      awareness inside your team. Integrate these tools with your workflow to reduce friction. Post-commit checks that
      automatically comment where code reviews are performed are ideal.
- [ ] Maintain a backlog of security concerns in your issue tracking tool.
      Every developer should contribute to maintaining a list of security issues to be fixed in the future. Making them available to
      the rest of the team will increase the security awareness in the company
- [ ] Never do cryptography yourself.
      Always rely on existing mechanisms, libraries and tools. Cryptography is an expertise. Building your implementations, or using
      flags and options you don't fully understand will expose you to major risks. Libraries such as na.cl (https://nacl.cr.yp.to/) expose
      few options and restrict you to the good choices.
- [ ] Keep secrets away from code.
      Never commit secrets in your code. They should be handled separately in order to prevent them accidentally being shared or
      exposed. This allows a clear separation between your environments (typically development, staging and production).
- [ ] Run application unprivileged.
      In case an attacker successfully attacks your application, having it running as a user with restricted privileges will make it
      harder for the attacker to take over the host and/or to bounce to other services. Privileged users are root on Unix systems,
      and Administrator or System on Windows systems
- [ ] Monitor your dependencies.
      Applications are built using dozens of third party libraries. A single flaw in any of these libraries may put your entire
      application at risk.
  - Github dependabot
- [ ] Enforce a password policy.
      Your user accounts will be way harder to steal if you require them to use complex passwords: mixed case, special characters,
      minimum length...

## Series A

- [ ] Take special care of your non tech employees. Non tech employees are less used to technical tricks and can be deceived more easily than others, opening the door to
      ransomware or confidentiality issues. They should be trained and empowered to be distrustful and to preserve the company’s.
      assets.
- [ ] Have a public security policy.
      This is a page on your corporate website describing how you plan to respond to external bug reports. You should advise you
      support responsible disclosure. Keep in mind that most of the reports that you receive probably won't be relevant.
- [ ] Do not share accounts
      Sharing a user account makes it hard to understand who is using the service or to identify who has performed a given action.
- [ ] Use centralized account management.
      A centralized place with all user authorizations is the best way not to forget anything once you need to update a user profile
      (e.g. if an internship came to its end). It is also great place to define standard account creation you need for a given user.
- [ ] Restrict internal services by IP addresses (your company’s ISP, VPNs, etc…).
      Everything non-public should only be accessible through a bounce host (e.g. no direct access to databases).
- [ ] Centralize and archive your logs and make them meaningful.
      Logs are necessary to trace what happened after an incident, find where the attacker came from, and possible even who they
      are. Many solutions exist to gather your logs. You need to take care about that the system time configured on each of your
      machines is in sync so that you can easily cross-correlate logs.
- [ ] Protect your application from DDoS attacks.
      A Distributed Denial-of-Service Attack (DDoS) can have devastating consequences on businesses. Basic DDoS protections
      can easily by integrated with a CDN.
- [ ] Watch for unusual patterns in your metrics.
      Takeovers will often be used to steal your data or setup your servers to be used as bouncers. These can be detected by
      watching for unusual patterns in metrics such as network bandwidth, CPU and memory consumption, and disk usage.
- [ ] Perform security oriented test sessions.
      Once in a while, the entire technical team should sit together and spend time targeting all parts of the application, looking for
      vulnerabilities. This is a great time to test for account isolation, token unicity, unauthenticated paths, etc… You will heavily rely
      on your browser’s web console, curl, and 3rd party tools such as Burp (https://portswigger.net/burp/).
- [ ] Use a real-time protection service.
      These tools protect web applications from attacks at runtime. The protection logic is inserted into applications. They
      protect against all major vulnerabilities (SQL injections, XSS attacks, account takeovers, code injections, etc...) without
      false positives.
- [ ] Encourage your users to use 2FA.
      As you get higher profile customers, you will be required to implement stronger security practices. This includes oering them
      2FA, role-based account management…
- [ ] Monitor your user’s suspicious activities.
      Some users may behave suspiciously, trying to hack into your application, subvert your services or bother your other
      customers. By monitoring such users, you will be able to block or flag the illegitimate ones.

## Post-series A

- [ ] Have an internal security policy. This is a short document stating the security requirements in your company and defining who is responsible and who is
      concerned with all aspects of security.
- [ ] Set up a bug bounty program.
      A bug bounty program will allow external hackers to report vulnerabilities. Most of the bug bounties program set rewards in
      place. You need security aware people inside your development teams to evaluate any reports you receive
- [ ] Make an inventory of your company’s assets.
      An awareness of your company’s assets enables you to monitor the points that need the most attention and vulnerabilities that
      need to be hardened.
- [ ] Have a security incident response plan.
      This will allow whoever is in charge at the time of a breach to communicate accordingly about an incident and will allow the
      fastest response in technical / communication terms.
- [ ] Know how t redeploy infrastructure from scratch.
      This allows you to quickly spawn new infrastructure and populate it with data from your backups. This is the perfect use case
      for disaster recovery.
- [ ] Use a secure development life cycle.
      The secure development lifecycle is a process that helps tackle security issues at the beginning of a project. While rarely used
      as is, it provides good insights at all stages of the project, from the specification to the release. It will allow you to enforce good
      practices at every stage of the project life.
- [ ] Hire an external penetration testing team.
      These take an external and naive point of view of your infrastructure and products. Pentesters will take nothing for granted
      and will check even the most basic assumptions, as well as all of your infrastructure. You can also ask them to start with a full,
      blind discovery of your infrastructure; which can help you remember about old assets.
