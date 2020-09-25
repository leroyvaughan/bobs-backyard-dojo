# Bob's Backyard Dojo Pricing Scheme

Recently I took a test for a job interview, and the test was 'TDD financial calculations'.
I believe it was almost impossible for a Software Engineer to complete this task in an hour,
unless they do dates and math all the time.  However, I learned something from the code challenge,
which in turn spawned this idea.

## What I learned

The importance of testing code and TDD.  I've been struggling to figure out why some companies prefer
to do TDD.  Now I see the importance of it when doing calculations and algorithmy functions.

So here is a code challenge I created for myself to display why TDD is important and also my approach to
coding a pricing scheme solution.


### Dumb Foo Martial Arts Rates

In Bob's Backyard Dojo he trains people in his own form of MMA so they can be mediocre amateur fighters, or
so they can profile and pose in public thinking they're bad.

Bob is a master at it, having attained a "Schmak Belt"
in "Dumb Foo" Fighting Style during his teen years.  Here is his pricing scheme:

```
(Sessions can be 2 or 3 hours)

  Daily rate
    $40/$55 per drop-in session

  Weekly Rate @ 3 sessions  (same week only)
    - 10% Discount

  Monthly Rate @ 12 Sessions (same month only)
    - 20% Discount
```

```
Session Scheduling Rules
 - max of three days per any given week
 - can only schedule in a single week at a time, or go monthly (*Bob may have other things to do)
 - max of 12 days per any given month
 - can only schedule one month at a time (*Bob may have other plans in the next month)
 - only 2 or 3 hour sessions available
 - 30% discount, for any group (gt 1 person, supersedes other discounts)
```

At these rates, who can afford not to take lessons here?  BTW, you can also get tattoos at Bob's Backyard Dojo!
After all, who wouldn't want to intimidate people so you don't have to actually fight?

Not only that, Bob sells pocket mirrors so you can practice looking hard when you have nothing else to do;
because you've exhausted FB & IG having already read all new posts for the day!!!

*Those pricing schemes will be added later...lol




```


----------------------------------|---------|----------|---------|---------|-------------------
File                              | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
----------------------------------|---------|----------|---------|---------|-------------------
All files                         |   98.24 |    96.15 |   98.04 |   98.21 |
 backyard_dojo                    |      90 |      100 |       0 |      90 |
  server.js                       |      90 |      100 |       0 |      90 | 12
 backyard_dojo/server/controllers |   90.48 |      100 |     100 |   90.48 |
  pricing-ctrl.js                 |   90.48 |      100 |     100 |   90.48 | 67-68
 backyard_dojo/server/data        |     100 |      100 |     100 |     100 |
  index.js                        |     100 |      100 |     100 |     100 |
 backyard_dojo/server/lib         |   98.61 |       96 |     100 |   98.58 |
  globals.js                      |     100 |      100 |     100 |     100 |
  helpers.js                      |   97.58 |    95.77 |     100 |    97.5 | 188,217,277-281
  scheduler.js                    |     100 |    94.12 |     100 |     100 | 102
 backyard_dojo/server/routes      |     100 |      100 |     100 |     100 |
  pricing-router.js               |     100 |      100 |     100 |     100 |
----------------------------------|---------|----------|---------|---------|-------------------

Test Suites: 3 passed, 3 total
Tests:       70 passed, 70 total
Snapshots:   0 total
Time:        8.89 s, estimated 48 s
Ran all test suites.



```



