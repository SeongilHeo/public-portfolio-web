## Abstract

This paper presents an approach to coordinated object handover between two robotic arms using the optimal Rapidly-exploring Random Tree (RRT*) algorithm. The primary challenge addressed is the generation of collision-free, optimal trajectories for both robots in a shared workspace while dynamically coordinating their motions to ensure a smooth and stable transfer of an object. Our method employs a dualarm planning framework in which each arm independently computes its motion plan using RRT*, while incorporating realtime constraints to maintain synchronization during the handover process. Simulation and experimental results on a dual-arm robotic platform demonstrate that our approach achieves efficient and reliable handovers with minimized path cost and reduced planning time, highlighting the potential of RRT*-based methods.

---

## Method

![1. System Workflow for Motion Planning and Visualization](/content/2025mp/1overview.png)

---

## Additional Experiments: What we tried?

#### 1. Environment

- 3 DoF Arm in 2D Space
- 7 DoF Arm in 3D Space

<div className="flex gap-4">
  <img src="/content/2025mp/2drrt.gif" alt="2(a). 2D environment" className="w-1/2" />
  <img src="/content/2025mp/3d.gif" alt="2(b). 3D environment" className="w-1/2" />
</div>

For the handover task, Since the robot’s base was fixed, it was hard to see  meaningful differences between the methods in 2D environment.
So we built a new CoppeliaSim simulation setup and ran experiments in both 2D and 3D environments.

#### 2. States Representation
- Option 1: Separate state, 2 trees
- Option 2: Combined states, 1 tree 

<div className="flex gap-4">
  <img src="/content/2025mp/3combined.png" alt="3(a). 2D environment" className="w-1/2" />
  <img src="/content/2025mp/3combined3d.png" alt="3(b). 3D environment" className="w-1/2" />
</div>

Using the bidirectional RRT’s approach
We considered two options: 
maintaining separate trees for each robot 
versus merging both robots into a single joint‐state tree.
However, the two robots have different kinematics, and each graph’s nodes repre-sent a robot’s individual configuration.
To handle this, we would have to run forward and inverse kinematics constantly. 
We implemented both forward and inverse kinematics, but inverse kinematics in particular was too time-consuming, 
so we maintained separate graphs for each robot.

#### 3. Optimal Handover Point
![4. Point marks](/content/2025mp/4optimal.png)

We also attempted to optimize the Handover Point.
First, we chose the midpoint between the start and end positions in the workspace. 
However, since the ball is on the floor, the handover point fell to the ground. 
And It create unnecessary motions for both robots. So Instead 
We tried sampling within the overlapping region of the two robots’ configuration spaces. 
Although this approach seemed reasonable /, we couldn’t detErmine which area was truly optimal.
Consequently, for our subsequent tasks, we manually selected an intermediate handover point and proceeded with those trials.

#### 4. Trajectory Smoothness
![5. Smoothness](/content/2025mp/5smooth.png)

We introduced a cost term based on the sum of squared jerk.
We combined distance and the term into a single cost by computing their weighted sum, 
but we couldn’t find suitable weight values 
So we failed to get meaningful experimental results.

#### 5. Gripper
![6. Grippers](/content/2025mp/6gripper.png)

The gripper is more complex to control than the robot arm. 
Especially. during joint movements the gripper often collided (as shown above), causing  failures of motion‐planning. 
Consequently, we decided to focus on the robot arm.

-----

## Results

#### 1. Time Comparison in 2D vs. 3D Environments

![7.  Time by sample size: RRT-Connect, RRT-Bidirectional, PRM, RRT and RRT* ](/content/2025mp/result-d.png)

In both 2D and 3D, every planner’s runtime grows as we increase the number of samples—roughly linearly for most of them.
The key point is that PRM first constructs a global roadmap and runs a graph search, 
whereas RRT* repeatedly checks neighbors and optimizes the path.

As a result, in a small 2D environment RRT* takes longer than PRM, 
but once scaled up to 3D, PRM incurs the greater computational cost.
This allowed us to indirectly observe the distinguishing features of graph‐search‐based versus optimization‐based sampling methods.

#### 2. Component Timing Analysis

![8. Comparison of total computation time and path length over iterations](/content/2025mp/result-time_component.png)

In class, we learned that collision checking and nearest‐neighbor search tend to dominate motion planning's runtime. 
To confirm this, we measured the time spent in each component, "finding nearest node", "colission checking" and "searching the neighbors node" as we increased the number of samples.
Intuitively, we expected the neighbor-search & rewiring steps—due to their many distance checks—to consume the bulk of the time. 
however, the collision-checking curve essentially overlaps with the total planning time.

We believe this was largely driven by the overhead of communicating with the simulator. Nonetheless, these results underscore the importance of highly efficient collision checking.

#### 3. Total Time vs. Path Length

![9. Component-wise time breakdown per iteration for two robots (R1 and R2)](/content/2025mp/result-test&dist.png)

This is our final experimental result: a visualization of each robot’s path length and the time consumed at every iteration.
Both robots’ path lengths the dashed lines drop sharply in the first 200 iterations and then flatten out.
The total planning time (solid lines) climbs almost perfectly linearly across all 1,000 iterations.
From this, we can see that instead of spending all sampling, RRT* should stop at an appropriate point.


