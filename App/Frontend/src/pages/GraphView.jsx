import { Network, Search } from 'lucide-react';
import { useEffect,useRef,useState } from 'react';
import * as d3 from "d3"
import { getGraph } from '../services/app.js';


export default function GraphView() {

   const svgRef = useRef()

   const [graph, setGraph] = useState({
    nodes:[],
    edges:[]
   })

   useEffect(()=>{
    const load = async ()=>{
      const data = await getGraph()
      setGraph(data)
    }
    load()
   },[])


   useEffect(()=>{

if(!graph.nodes.length) return;

const svg = d3.select(svgRef.current);
svg.selectAll("*").remove();

const g = svg.append("g");

svg.call(
  d3.zoom().on("zoom", (event) => {
    g.attr("transform", event.transform);
  })
);



const width = svgRef.current.clientWidth;
const height = svgRef.current.clientHeight;

const nodes = graph.nodes.map(n => ({
  id: n.id || n.item,
  title: n.title,
  type: n.type
}));

const highlight = (event, d) => {

node.attr("opacity", n =>
  n.id === d.id ||
  links.some(l =>
    (l.source.id === d.id && l.target.id === n.id) ||
    (l.target.id === d.id && l.source.id === n.id)
  )
  ? 1
  : 0.1
);

link.attr("opacity", l =>
  l.source.id === d.id || l.target.id === d.id
  ? 1
  : 0.1
);

label.attr("opacity", n =>
  n.id === d.id ||
  links.some(l =>
    (l.source.id === d.id && l.target.id === n.id) ||
    (l.target.id === d.id && l.source.id === n.id)
  )
  ? 1
  : 0.1
);

};

const handleClick = (event, d) => {

const original = graph.nodes.find(
  n => (n.id || n.item) === d.id
);

if(original?.url){
  window.open(original.url,"_blank")
}else{
  alert(original?.title)
}

}


const reset = () => {
node.attr("opacity", 1);
link.attr("opacity", 1);
label.attr("opacity", 1);
};


const links = graph.edges.map(e => ({
  source: e.source,
  target: e.target
}));

const getColor = (type) => {
  switch(type){
    case "video": return "#ef4444"
    case "image": return "#10b981"
    case "url": return "#3b82f6"
    case "text": return "#a1a1aa"
    default: return "#3b82f6"
  }
}




// Brain of Graph:-
const simulation = d3.forceSimulation(nodes)
  .force("link",
    d3.forceLink(links)
    .id(d=>d.id)
    .distance(120)
  )
  .force("charge", d3.forceManyBody().strength(-200))
  .force("center", d3.forceCenter(width/2,height/2))

const link = g
  .append("g")
  .selectAll("line")
  .data(links)
  .enter()
  .append("line")
  .attr("stroke","#444")

  const label = g
  .append("g")
  .selectAll("text")
  .data(nodes)
  .enter()
  .append("text")
  .text(d => d.title)
  .attr("fill", "#9ca3af")
  .attr("font-size", "12px")
  .attr("dx", 10)
  .attr("dy", 4)


const node = g
  .append("g")
  .selectAll("circle")
  .data(nodes)
  .enter()
  .append("circle")
  .attr("r",6)
  .attr("fill", d=>getColor(d.type))

  node.call(
    d3.drag()
      .on("start",dragstarted)
      .on("drag",dragged)
      .on("end",dragended)
  )
  node
  .on("mouseover",highlight)
  .on("mouseout",reset)
  .on("click",handleClick)

node.append("title")
.text(d=>d.title)

simulation.on("tick",()=>{

link
.attr("x1",d=>d.source.x)
.attr("y1",d=>d.source.y)
.attr("x2",d=>d.target.x)
.attr("y2",d=>d.target.y)

node
.attr("cx",d=>d.x)
.attr("cy",d=>d.y)

label
.attr("x", d => d.x)
.attr("y", d => d.y)

})

function dragstarted(event,d){
if(!event.active) simulation.alphaTarget(0.3).restart()
d.fx = d.x
d.fy = d.y
}

function dragged(event,d){
d.fx = event.x
d.fy = event.y
}

function dragended(event,d){
if(!event.active) simulation.alphaTarget(0)
d.fx = null
d.fy = null
}

},[graph])


  return (
    <div className="h-full flex flex-col relative overflow-hidden">
      <header className="mb-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-lg bg-surface border border-white/10 text-primary-glow">
            <Network size={24} />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Knowledge Graph</h1>
        </div>
        <p className="text-zinc-400">Placeholder for future d3.js or react-force-graph implementation.</p>
      </header>

      <div className="flex-1 border border-white/10 rounded-xl bg-surface/30 relative flex items-center justify-center overflow-hidden">
       <svg
  ref={svgRef}
  className="w-full h-full"
        />


      </div>
    </div>
  );
}
