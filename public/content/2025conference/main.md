## I.Introduction

#### Open Agent Systems (OASYS):
  - Models real‑world non‑stationarity
  - Systems that allow such dynamic participation

#### Track #3: Wildfire
-   Agent openness: available agents appear/disappear
-   Task openness: available tasks appear/disappear

---

## II. Related Work

### Graph Neural Networks (GNNs)
- Deep learning models for graph-structured data 	
- Leverage node features, edge connections, and global graph attributes
#### Message Passing Framework 
1. Message Computation: Aggregate feature messages from each neighbor 	
1. Aggregation: Sum or average the incoming messages 	
1. Update: Combine the aggregated message with the node’s own features to produce a new embedding
#### Layer Stacking
- Stack multiple message-passing layers to capture multi-hop relationships 
#### Common Variants 
- **GCN (Graph Convolutional Network)**: Simple sum/average aggregation 	
- **GAT (Graph Attention Network)**: Learns attention weights over neighbors 
- **GraphSAGE**: Sampling-based neighborhood aggregation with flexible functions 

### Graph Attention Network (GAT)
![1. System Workflow for Motion Planning and Visualization](/content/2025moasei/1gat.png)

---

## III. Problem Statement
<div className="flex flex-col md:flex-row gap-4">
  <div className="md:w-1/2">

- $𝑆$: State (agent positions, suppressant levels; fire locations, intensities) 
- $𝑈$: Actions (suppress fire, no‑op) 
- $𝑃$: State transition function
- $𝑟$: Shared team reward
- $𝑍$: Observation space
- $𝑂$: Observation function
- $𝑛$:  the number of active agents

$$ 
M=<S,U,P,r,Z,O,n> 
$$
  </div>

  <div className="md:w-1/2">
  
![2. Wildfire Environment](/content/2025moasei/2env.png)
  </div>

</div>

---

## IV. Method

##### 1. GNN-based Advantage Actor-Critic (A2C)

##### 2. GNN-based policy learning with Multi-objective Heads
- GNN with Vanilla Policy Gradient (VPG)
- GNN with Suppressant level Prediction (SP)
- GNN with Intent Prediction and Belief Update (IP + BU)

### Method: State Representation

![3. Incidence graph of the hypergraph](/content/2025moasei/3inc.png)

### Method: Advantage Actor‑Critic (A2C)

![4. Flow of the Advantage Actor–Critic (A2C)](/content/2025moasei/4a2c.png)

### Method: 1) GNN-based A2C
<div className="flex flex-col md:flex-row gap-4">
  <div className="md:w-1/2">

  - Discounted returns. 
  $$
  R_t = \sum^{T-t}_{k=0} \gamma^k r_{t+k}
  $$
  - Advantage
  $$
  A_t = R_t - V(s_t)
  $$
  - Loss
  $$
  \begin{align*}
    &\mathcal{L}_{\text{actor}} = -\log \pi(a_t\mid s_t)\;A_t \\
    &\mathcal{L}_{\text{critic}}  = \frac{1}{N}\sum_{t=1}^N \bigl(Q(s_t,a_t) - R_t\bigr)^2\\
  \end{align*}
  $$

  </div>

  <div className="md:w-1/2">

  ![5. Advantage Actor–Critic (A2C) Model](/content/2025moasei/5a2cmodel.png)

  </div>

</div>

### Method: 2) GNN-based policy learning
<div className="flex flex-col md:flex-row gap-4">
  <div className="md:w-1/2">

- $\blue{\mathcal{L}_\text{task}}$: Task selection (RL loss)
- $\orange{\mathcal{L}_\text{suppress}}$: Predict suppressant level of other agents
- $\green{\mathcal{L}_\text{intent}}$: Predict intent action of other agents
- $\red{\mathcal{L}_\text{belief}}$: Penalty for overconfident fire predictions

$$
\begin{align*}
    &\blue{\mathcal{L}_\text{task}} \quad\;\; = -\log \pi(a_i | o_i) \cdot R_i \\
    &\orange{\mathcal{L}_\text{suppress}} = \sum \text{CrossEntropy} (s_\text{true}, s_\text{pred}) \\
    &\green{\mathcal{L}_\text{intent}} \quad = \sum \text{CrossEntropy} (\hat{a}_{j}, a_{j}) \\
    &\red{\mathcal{L}_\text{belief}} \quad\;\; = \frac{1}{|T|} \sum_{t\in T} (b_t \cdot (1-o_t))^2 \\
&\mathcal{L}_\text{total} = \blue{\mathcal{L}_\text{task}} + \lambda_\text{suppress}\orange{\mathcal{L}_\text{suppress}} + \lambda_\text{intent}\green{\mathcal{L}_\text{intent}}+ \lambda_\text{belief}\red{\mathcal{L}_\text{belief}}
\end{align*}
$$

  </div>

  <div className="md:w-1/2">

  ![6. GNN-based policy learning Model](/content/2025moasei/6vpn.png)

  </div>
</div>

---

## V. Experiment

### Experiment: Curriculum Learning

![7. A2C training reward and loss curve](/content/2025moasei/7cl.png)

### Experiment: Loss Analysis

![8. Individual loss curves for each firefighter agent under policy learning without weighted auxiliary losses](/content/2025moasei/8la-d.png)

![9. Individual loss curves for each firefighter agent under policy learning with weighted auxiliary losses](/content/2025moasei/9la-i.png)

![10. Policy learning reward curves during training](/content/2025moasei/10r.png)

### Experiment: Algorithm Comparison

![](/content/2025moasei/11.png)

## VI. Challenges and Insights

### Challenges
- Agents and tasks change dynamically, breaking standard MARL assumptions.
- Agents must coordinate without explicit communication or shared state.
- The environment is highly non-stationary, often destabilizing traditional learning methods.

### Insights
- GNNs capture dynamic agent-task relations effectively.
- Adding suppressant, intent, and belief heads improves coordination.
- A centralized training setup with decentralized execution generalizes across dynamic teams.

## VII. Conclusion

- Wildfire testbed for evaluating open‑system MARL methods
- Decentralized agents learn adaptive, communication‑free policies in dynamic settings
- Auxiliary objectives (suppressant, intent, belief) boost learning and coordination
- Higher training variance but stable, robust test performance

## References

[1] Stefano V. Albrecht, Filippos Christianos, and Lukas Schäfer. Multi-Agent Reinforcement Learning: Foundations and Modern Approaches. MIT Press, 2024.       
[2] Gayathri Anil. Multi-agent reinforcement learning for task open systems. UGA Open Scholar, (IR):124, 2024.       
[3] Muthukumaran Chandrasekaran, A. Eck, Prashant Doshi, and Leen-Kiat Soh. Individual planning in open and typed agent systems. In Conference on Uncertainty in Artificial Intelligence, 2016.       
[4] Vijay Konda and John Tsitsiklis. Actor-critic algorithms. Advances in neural information processing systems, 12, 1999.       
[5] Arrasy Rahman, Niklas Höpner, Filippos Christianos, and Stefano V. Albrecht. Towards open ad hoc teamwork using graph-based policy learning. In International Conference on Machine Learning, 2020.     
[6] Tabish Rashid, Mikayel Samvelyan, Christian Schroeder de Witt, Gregory Farquhar, Jakob Foerster, and Shimon Whiteson. Qmix: Monotonic value function factorisation for deep multi- agent reinforcement learning, 2018.     
[7] Roxana R˘adulescu, Manon Legrand, Kyriakos Efthymiadis, D. Roijers, and A. Nowé. Deep multi-agent reinforcement learning in a homogeneous open population. In BNCAI, 2018.    
[8] Peter Sunehag, Guy Lever, Audrunas Gruslys, Wojciech Marian Czarnecki, Vinicius Zambaldi, Max Jaderberg, Marc Lanctot, Nicolas Sonnerat, Joel Z. Leibo, Karl Tuyls, and Thore Graepel. Value-decomposition networks for cooperative multi-agent learning, 2017.    
[9] Ziqian Zhang, Lei Yuan, Lihe Li, Ke Xue, Chengxing Jia, Cong Guan, Chao Qian, and Yang Yu. Fast teammate adaptation in the presence of sudden policy change. In Conference on Uncertainty in   
Artificial Intelligence, 2023.    
  
