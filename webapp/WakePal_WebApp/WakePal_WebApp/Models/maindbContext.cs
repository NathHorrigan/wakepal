using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace WakePal_WebApp.Models
{
    public partial class maindbContext : DbContext
    {
        public maindbContext()
        {
        }

        public maindbContext(DbContextOptions<maindbContext> options)
            : base(options)
        {
        }

        public virtual DbSet<DailyFitness> DailyFitness { get; set; }
        public virtual DbSet<FriendshipRequests> FriendshipRequests { get; set; }
        public virtual DbSet<Friendships> Friendships { get; set; }
        public virtual DbSet<PasswordResets> PasswordResets { get; set; }
        public virtual DbSet<Sleep> Sleep { get; set; }
        public virtual DbSet<Users> Users { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("Server=wakepal.cfkxkhkgqmap.us-east-2.rds.amazonaws.com;Database=maindb;User Id=admin; Password=PZZUtrCx7unTU2eVwPkpsBkBNCcWG6vmquifhJpn");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<DailyFitness>(entity =>
            {
                entity.HasKey(e => e.FitnessId);

                entity.Property(e => e.FitnessId)
                    .HasColumnName("fitnessId")
                    .ValueGeneratedNever();

                entity.Property(e => e.Calories).HasColumnName("calories");

                entity.Property(e => e.FitnessDate)
                    .HasColumnName("fitnessDate")
                    .HasColumnType("date");

                entity.Property(e => e.Floors).HasColumnName("floors");

                entity.Property(e => e.Steps).HasColumnName("steps");

                entity.Property(e => e.UserId).HasColumnName("userId");

                entity.Property(e => e.Water).HasColumnName("water");

                entity.Property(e => e.Weight)
                    .HasColumnName("weight")
                    .HasColumnType("numeric(18, 3)");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.DailyFitness)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_dailyFitnessUser");
            });

            modelBuilder.Entity<FriendshipRequests>(entity =>
            {
                entity.HasKey(e => e.RequestId);

                entity.Property(e => e.RequestId)
                    .HasColumnName("requestId")
                    .ValueGeneratedNever();

                entity.Property(e => e.RecipientId).HasColumnName("recipientId");

                entity.Property(e => e.RequestorId).HasColumnName("requestorId");

                entity.HasOne(d => d.Recipient)
                    .WithMany(p => p.FriendshipRequestsRecipient)
                    .HasForeignKey(d => d.RecipientId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_friendshipRecipients");

                entity.HasOne(d => d.Requestor)
                    .WithMany(p => p.FriendshipRequestsRequestor)
                    .HasForeignKey(d => d.RequestorId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_friendshipRequestor");
            });

            modelBuilder.Entity<Friendships>(entity =>
            {
                entity.HasKey(e => e.FriendshipId);

                entity.Property(e => e.FriendshipId)
                    .HasColumnName("friendshipId")
                    .ValueGeneratedNever();

                entity.Property(e => e.FriendId).HasColumnName("friendId");

                entity.Property(e => e.UserId).HasColumnName("userId");

                entity.HasOne(d => d.Friend)
                    .WithMany(p => p.FriendshipsFriend)
                    .HasForeignKey(d => d.FriendId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_friendshipFriend");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.FriendshipsUser)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_friendshipUser");
            });

            modelBuilder.Entity<PasswordResets>(entity =>
            {
                entity.HasKey(e => e.ResetId);

                entity.Property(e => e.ResetId)
                    .HasColumnName("resetId")
                    .ValueGeneratedNever();

                entity.Property(e => e.Code)
                    .IsRequired()
                    .HasMaxLength(25)
                    .IsUnicode(false);

                entity.Property(e => e.CreationDate).HasColumnType("datetime");

                entity.Property(e => e.ExpirationDate).HasColumnType("datetime");

                entity.Property(e => e.UserId).HasColumnName("userId");

                entity.HasOne(d => d.Reset)
                    .WithOne(p => p.PasswordResets)
                    .HasForeignKey<PasswordResets>(d => d.ResetId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_ResetUser");
            });

            modelBuilder.Entity<Sleep>(entity =>
            {
                entity.Property(e => e.SleepId)
                    .HasColumnName("sleepId")
                    .ValueGeneratedNever();

                entity.Property(e => e.Awake).HasColumnName("awake");

                entity.Property(e => e.Deep).HasColumnName("deep");

                entity.Property(e => e.Light).HasColumnName("light");

                entity.Property(e => e.Rem).HasColumnName("rem");

                entity.Property(e => e.SleepDate)
                    .HasColumnName("sleepDate")
                    .HasColumnType("date");

                entity.Property(e => e.UserId).HasColumnName("userId");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Sleep)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_SleepUser");
            });

            modelBuilder.Entity<Users>(entity =>
            {
                entity.HasKey(e => e.UserId);

                entity.Property(e => e.UserId)
                    .HasColumnName("userId")
                    .ValueGeneratedNever();

                entity.Property(e => e.Age).HasColumnName("age");

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasColumnName("email")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.FirstName)
                    .IsRequired()
                    .HasColumnName("firstName")
                    .HasMaxLength(25)
                    .IsUnicode(false);

                entity.Property(e => e.Height)
                    .HasColumnName("height")
                    .HasColumnType("numeric(18, 3)");

                entity.Property(e => e.LastName)
                    .IsRequired()
                    .HasColumnName("lastName")
                    .HasMaxLength(25)
                    .IsUnicode(false);

                entity.Property(e => e.Password)
                    .IsRequired()
                    .HasColumnName("password")
                    .HasMaxLength(1)
                    .IsUnicode(false);

                entity.Property(e => e.Weight)
                    .HasColumnName("weight")
                    .HasColumnType("numeric(18, 3)");
            });
        }
    }
}
