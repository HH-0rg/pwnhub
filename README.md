# PwnHub
> Pwn - In hacker jargon, pwn means to compromise or control, specifically another computer, web site, gateway device, or application.

*Pwn them like you own them*

## What is PwnHub?


Platform for bug bounty hunters to host their exploits and provide PoCs without revealing the vulnerability, in order to ensure fair negotiations and better payouts. Can be used in conjunction with existing platforms like hacker1, bugcrowd, snyk e.t.c

## Problem Statement

The independent security research and bug bounty culture have gained a lot of traction over the last few years. There now exist dedicated platforms like *HackerOne* and *bugcrowd* for secure vulnerability disclosure and subsequent payouts for bug hunters. In order to get paid for a discovered vulnerability, a hacker needs to first demonstrate a **Proof of Concept**, usually in the form of a working exploit.

One major flaw with this model is that it requires the independent hacker to expose his exploit in order to even begin discussions on a bounty, thus effectively losing their leverage in the negotiation.

## Solution

PwnHub is a dynamic, scalable **PaaS with secure blockchain based payment gateways** aimed at providing individuals a way to host their exploits and allow corporates to interact with them using **mutually agreed-upon test scripts**, without revealing the actual exploit.

* This brings more weight to the hacker’s negotiation with corporates that have active bounty programs, leading to more **fair payouts**
* This has an even greater impact for bug reports in **companies without an organized disclosure program**, as this is where the reports of cold calls and severely underpaid reports are the most rampant
* There is a mutual **portal for the corporate to submit test cases**, the hacker to review them, and for both parties to negotiate the bounty amount until mutual understanding is reached
* Transactions are implemented through a secure payment gateway based on **Blockchain** transactions using **Portis** as a driver.

Even though our platform does provide an in-built negotiation as well as payment gateway functionality and can, in theory, function as an independent vulnerability disclosure platform, it is in no way meant to compete with existing solutions like *HackerOne* or *bugcrowd* but rather complement them by providing bug hunters an alternative means of demonstrating their PoCs without exposing any vital info as they proceed with negotiations. 