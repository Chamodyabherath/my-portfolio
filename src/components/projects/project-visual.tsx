import {
  AudioLines,
  Database,
  FlaskConical,
  Layers3,
  Leaf,
  Mic,
  Monitor,
  Package,
  ScanLine,
  ShoppingBag,
  Truck,
  Wheat,
} from "lucide-react";
import type { Project, ProjectKind } from "@/types";

const artwork = {
  enterprise: { mark: Layers3, icons: [Package, Database, Truck] },
  commerce: { mark: ShoppingBag, icons: [Package, ScanLine, ShoppingBag] },
  voice: { mark: AudioLines, icons: [Mic, AudioLines, Monitor] },
  research: { mark: FlaskConical, icons: [Leaf, FlaskConical, Wheat] },
} satisfies Record<
  ProjectKind,
  { mark: typeof Monitor; icons: readonly (typeof Monitor)[] }
>;

export function ProjectVisual({ project }: { project: Project }) {
  const { mark: Mark, icons } = artwork[project.kind];
  return (
    <figure
      className={`project-visual visual-${project.kind}`}
      aria-label={project.diagram.title}
    >
      <div className="visual-label">
        <Mark size={15} aria-hidden="true" /> {project.diagram.title}
      </div>
      <div className="visual-body">
        <div className="visual-orbit" aria-hidden="true">
          <Mark />
        </div>
        <ol className="visual-flow">
          {project.diagram.steps.map(({ title, detail }, index) => {
            const Icon = icons[index] ?? Mark;
            return (
              <li className="visual-node" key={title}>
                <Icon size={20} aria-hidden="true" />
                <span>
                  {title}
                  <small>{detail}</small>
                </span>
              </li>
            );
          })}
        </ol>
      </div>
      <figcaption className="visual-caption">
        {project.diagram.caption}
      </figcaption>
    </figure>
  );
}
