using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace the_third
{

    public class TodoItem
    {
        public int Id { get; set; }
        public int ListId { get; set; }

        [MaxLength(300)]
        [Required]
        public string Title { get; set; }

        public bool IsCompleted { get; set; }

        public bool IsImportant { get; set; }

        [ForeignKey("ListId")]
        public virtual TodoList List { get; set; }
    }

    public class TodoList
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(300)]
        public string Name { get; set; }

        public virtual ICollection<TodoItem> Items { get; set; }
    }
}